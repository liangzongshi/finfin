require('dotenv').config()
const Redis = require("ioredis")
const redis = new Redis()
const R = require('ramda')
const DB = require('./db')
const db = new DB()
const tree = require('./tree')
const price = require('./token')
const {toId} = require('./util')

//ETH
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/95d96f6402fa41459347dd947e59d900'))
const {toWallet} = require('send-ether-fix')
const FlexEther = require('flex-ether-fix')
const FlexContract = require('flex-contract-fix')

//BTC
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')
const MyWallet = require('blockchain.info/MyWallet')
const Receive = require('blockchain.info/Receive')

//BNB
const BncClient = require('@binance-chain/javascript-sdk')
const WebSocket = require('ws')
const axios = require('axios')

const fees = async (id, symbol) => {
    const p = await price.get(symbol)
    const dwFee = (await tree.limit(id)).dwFee
    return (dwFee / p).toFixed(6)
}

class BTC {
    constructor(){
        this.wallet = new MyWallet(process.env.bcinfo_id, process.env.bcinfo_pass, { 
            apiCode: process.env.bcinfo_api, 
            apiHost: process.env.bcinfo_host 
        })
        this.receive = new Receive(process.env.bcinfo_xpub, process.env.bcinfo_hook, process.env.bcinfo_api,{
             __unsafe__gapLimit: 1000
        })
    }

    hd = (index) => {
        const seed = bip39.mnemonicToSeedSync(process.env.mnemonic)
        const root = bip32.fromSeed(seed)
        const child = root.derivePath("m/44'/0'/0'/0/"+index)
        const Address = bitcoin.payments.p2pkh({ pubkey: child.publicKey }).address
        return {address: Address, index: index, key: child.toWIF()}
    }

    //DONE
    add = async (id) => {
        // const res = await this.receive.generate({secret: process.env.bcinfo_sr})
        const res = this.hd(await redis.get('index_wallet'))
        await redis.incr('index_wallet')

        await redis.sadd('received_btc', res.address)
        await db.user({
            id: id,
            index: res.index,
            currency: [{
                address: res.address,
                coin: 'Bitcoin',
                logo: '/assets/coin/btc.png',
                symbol: 'BTC',
                balance: 0,
                to_swap: [{
                    coin: 'FinFine',
                    symbol: 'FFT'
                }]
            }]
        })
        return {
            index: res.index,
        }
    }

    //DONE
    send = async (to, amount, id, memo) => {
        if ( (await redis.get(id)) == null ) {
            await redis.set(id, 'locked')
            await redis.expire(id, 15)

            amount = Number(amount)
            var doc = await db.user({id: id}, 'currency.balance currency.symbol')
            var balance = R.filter( n => n.symbol == 'BTC', doc[0].currency).pop().balance

            if ( balance >= amount ) {
                const fee = await fees(id, 'BTC')
                const txs = await this.wallet.send(to, ((amount - fee) * 10**8).toFixed(0), { from: 0, feePerByte: 6})
                var tx = {
                    hash: txs.tx_hash,
                    address: to,
                    value: amount - fee,
                    symbol: 'BTC',
                    type: 'withdraw'
                }

                console.log(tx)

                await db.user({id: id, 'currency.symbol': 'BTC'}, {$inc: {'currency.$.balance': - amount}})
                await db.user({id: id}, {$push: {'history': tx}})

                await db.user({index: 1, 'currency.symbol': 'BTC'}, {$inc: {'currency.$.balance': - amount}})

                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'BTC',
                            value: - amount
                        }
                    }
                })

                return tx
            } else {
                return 'amount'
            }
        }
    }

    //DONE
    hook = () => {
        const conn = new WebSocket('wss://ws.blockchain.info/inv')
        conn.on('open', () => {
            conn.send("{'op':'unconfirmed_sub'}")
        })
    
        conn.on('message', async (event) => {
            var ev = JSON.parse(event)
            const outputs = ev.x.out

            const mb = await redis.smembers('received_btc')

            const filter = outputs.filter(output => mb.includes(output.addr))

            if (filter.length !== 0){
                var tx = {
                    hash: ev.x.hash,
                    value: Number(filter[0].value) / 10**8,
                    address: filter[0].addr,
                    symbol: 'BTC',
                    type: 'deposit'
                }

                console.log(tx)
                const fee = await fees(toId({'currency.address': tx.address}, 'id'), 'BTC')

                await db.user({'currency.address': tx.address, 'currency.symbol': 'BTC'}, {$inc: {'currency.$.balance': + (tx.value - fee) }})
                await db.user({'currency.address': tx.address}, {$push: {'history': tx}})
                await db.user({index: 1, 'currency.symbol': 'BTC'}, {$inc: {'currency.$.balance': + (tx.value - fee)}})

                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'BTC',
                            value: tx.value
                        }
                    }
                })
            }
        })
    }
}

const btc = new BTC()

// Socket
const Esock = new WebSocket(`wss://ws.web3api.io?x-api-key=${process.env.amber_api}&x-amberdata-blockchain-id=ethereum-mainnet`)
Esock.on('open', () => {
    console.log('Connected Esock')
})

class ETH {
    constructor(){
        this.ether = new FlexEther({
            network: process.env.eth_network,
            infuraKey: process.env.infura,
            providerURI: `https://${process.env.eth_network}.infura.io/v3/${process.env.infura}`,
        })
    }

    add = async (index) => {
        var t =  toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})

        setTimeout(() =>{
            Esock.send(JSON.stringify({
                jsonrpc: '2.0',
                method: 'subscribe',
                params: ['address:transactions', {
                    address: t.address
                }],
                id: 1,
            }))
        }, 1000)

        await redis.sadd('received_eth', t.address)
        await db.user({index: index}, {$push: {'currency': {
            symbol: 'ETH',
            coin: 'Ethereum',
            logo: '/assets/coin/eth.png',
            address: t.address,
            balance: 0,
            to_swap: [{
                coin: 'FinFine',
                symbol: 'FFT'
            }]
        }}})
    }

    hd = (index) => toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})

    send = async (to, amount, id, memo) => {

        if ( (await redis.get(id)) == null ) {
            redis.set(id, 'locked')
            redis.expire(id, 15)

            amount = Number(amount)
            var doc = await db.user({id: id}, 'currency.balance currency.symbol')
            var balance = R.filter( n => n.symbol == 'ETH', doc[0].currency).pop().balance
    
            if (balance>= amount) {
                const fee = await fees(id, 'ETH')
                const hash = (await this.ether.transfer(to, amount - fee, {key: this.hd(1).key.slice(2, this.hd(1).key.length)})).transactionHash
                var tx = {
                    hash: hash,
                    address: to,
                    value: amount - fee,
                    symbol: 'ETH',
                    type: 'withdraw'
                }
                await db.user({id: id, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': - amount}})
                await db.user({id: id}, {$push: {'history': tx}})
    
                await db.user({index: 1, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': - amount}})
                
                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'ETH',
                            value: - amount
                        }
                    }
                })

                return tx
            } else {
                return 'amount'
            }
        }
    }

    transfer = async (amount, index) => {
        console.log(amount, index)
        const to = this.hd(1).address
        const key = this.hd(index).key.slice(2, this.hd(index).key.length)
        console.log(to, key)
        const hash = (await this.ether.transfer( to, Number(amount), {key: key})).transactionHash
        console.log(hash)
    }

    _hook = () => {
        const subscribe = web3.eth.subscribe('pendingTransactions', (err, tx) => {
            if (err) return console.error(err)
            web3.eth.getTransaction(tx, async (err, txData) => {
                if ((txData !== null) && (txData !== undefined) && (await redis.smembers('received_eth')).includes(txData.to)){
                    const index = (await db.user({'currency.address': txData.to}, 'index'))[0].index
                    const tx = {
                        hash: txData.hash,
                        value: Number(txData.value)/ 10**18,
                        address: txData.to,
                        symbol: 'ETH',
                        type: 'deposit',
                    }
    
                    await db.user({'currency.address': tx.address, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': + (tx.value - 0.001)}})
                    await db.user({'currency.address': tx.address}, {$push: {'history': tx}})
    
                    await db.user({index: 1, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': + (tx.value - 0.001)}})
    
                    setTimeout( async () => {
                        await this.transfer(tx.value - 0.001, index)
                    }, 15000)
                }
            })
        })
    }

    hook = async () => {
        Esock.on('message', async (data) => {
            const res =  JSON.parse(data)
            if (res.id == 1){
                console.log(data)
            } else {
                const result = res.params.result
                const received_eth = (await redis.smembers('received_eth')).map(v => v.toLowerCase())

                if (received_eth.includes(result.to)){
                    const index = (await db.user({'currency.address': {$regex: new RegExp('^' + result.to, 'i')}}, 'index'))[0].index
                    const tx = {
                        hash: result.hash,
                        value: Number(result.value)/ 10**18,
                        address: result.to,
                        symbol: 'ETH',
                        type: 'deposit',
                    }

                    console.log(tx)
                    const fee = await fees(toId({'currency.address': {$regex: new RegExp('^' + tx.address, 'i')}}, 'id'), 'ETH')    
                    await db.user({'currency.address': {$regex: new RegExp('^' + tx.address, 'i')}, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': + (tx.value - fee)}})
                    await db.user({'currency.address': {$regex: new RegExp('^' + tx.address, 'i')}}, {$push: {'history': tx}})
    
                    await db.user({index: 1, 'currency.symbol': 'ETH'}, {$inc: {'currency.$.balance': + (tx.value - fee)}})
    
                    await db.admin({}, {
                        $push: {
                            totalFlow: {
                                symbol: 'ETH',
                                value: tx.value
                            }
                        }
                    })

                    // await this.transfer(tx.value - 0.001, index)
                }
            }
        })

        setTimeout( async () =>{
            const addresses = await redis.smembers('received_eth')
            addresses.forEach((address) => {
                Esock.send(JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'subscribe',
                    params: ['address:transactions', {
                        address: address
                    }],
                    id: 1,
                }))
            })
        }, 5000)
    }
}

const eth = new ETH()

class USDT {
    constructor(){
        const provider = new FlexEther({
            network: process.env.eth_network,
            infuraKey: process.env.infura,
            providerURI: `https://${process.env.eth_network}.infura.io/v3/${process.env.infura}`,
        })
        const abi = require('./usdt.json')
        this.contract = new FlexContract(abi, process.env.usdt_at, {
            eth: provider,
        })
        this.ET = new ETH()
    }

    add = async (index) => {
        var t =  toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})
        await db.user({index: index}, {$push: {'currency': {
            symbol: process.env.usdt_symbol,
            coin: 'Tether USD (ERC20)',
            logo: '/assets/coin/usdt.png',
            address: t.address,
            balance: 0,
            to_swap: [{
                coin: 'FinFine',
                symbol: 'FFT'
            }]
        }}})
    }
    hd = (index) => toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})

    send = async (to, amount, id, memo) => {

        if ( (await redis.get(id)) == null ) {
            redis.set(id, 'locked')
            redis.expire(id, 15)

            var doc = await db.user({id: id}, 'currency.balance currency.symbol')
            var balance = R.filter( n => n.symbol == process.env.usdt_symbol, doc[0].currency).pop().balance
    
            if (balance>= amount) {
                const fee = await fees(id, 'USDT')
                let tx = {
                    hash: (await this.contract.transfer(to, ((Number(amount) - fee) * 10**process.env.usdt_dec).toFixed(0), {
                        key: this.hd(index).key.slice(2,this.hd(index).key.length)
                    })).transactionHash,
                    address: to,
                    value: Number(amount) - fee,
                    symbol: process.env.usdt_symbol,
                    type: 'withdraw'
                }
                await db.user({id: id, 'currency.symbol': process.env.usdt_symbol}, {$inc: {'currency.$.balance': - amount}})
                await db.user({id: id}, {$push: {'history': tx}})
                await db.user({index: 1, 'currency.symbol': process.env.usdt_symbol}, {$inc: {'currency.$.balance': - amount}})
    
                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'USDT',
                            value: - amount
                        }
                    }
                })

                return tx
            } else {
                return 'amount'
            }
        }
    }

    transfer = async (amount, index) => {
        await this.contract.transfer(this.hd(1).address, (Number(amount) * 10**process.env.usdt_dec).toFixed(0), {
            key: this.hd(index).key.slice(2, this.hd(index).key.length)
        })
    }

    hook = () => {
        let watcher = this.contract.Transfer.watch()
        watcher.on('data', async (data) => {
            if ((await redis.smembers('received_eth')).includes(data.args.to)){
                const index = (await db.user({'currency.address': data.args.to}, 'index')).index
                var tx = {
                    hash: data.transactionHash,
                    value: data.args.value / 10**process.env.usdt_dec,
                    address: data.args.to,
                    symbol: process.env.usdt_symbol,
                    type: 'deposit'
                }

                console.log(tx)
                const fee = await fees(toId({'currency.address': tx.address}, 'id'), 'USDT')
                await db.user({'currency.address': tx.address, 'currency.symbol': process.env.usdt_symbol}, {$inc: {'currency.$.balance': + (tx.value - fee)}})
                await db.user({'currency.address': tx.address}, {$push: {'history': tx}})

                await db.user({index: 1, 'currency.symbol': process.env.usdt_symbol}, {$inc: {'currency.$.balance': + tx.value}})

                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'USDT',
                            value: tx.value
                        }
                    }
                })

                // await this.ET.send(tx.address, 0.001, 100000, ' ')
                // await this.transfer(tx.value, index)
            }
        })
    }
}

const usdt = new USDT()

class FFT {
    constructor(){
        const provider = new FlexEther({
            network: process.env.eth_network,
            infuraKey: process.env.infura,
            providerURI: `https://${process.env.eth_network}.infura.io/v3/${process.env.infura}`,
        })
        const abi = require('./fft.json')
        this.contract = new FlexContract(abi, process.env.fft_at, {
            eth: provider,
        })
        this.ET = new ETH()
    }

    add = async (index) => {
        var t =  toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})
        await db.user({index: index}, {$push: {'currency': {
            symbol: process.env.fft_symbol,
            coin: 'FinFine',
            logo: '/assets/coin/fft.png',
            address: t.address,
            balance: 0,
            to_swap: [
                {
                    coin: 'Bitcoin',
                    symbol: 'BTC'
                },
                {
                    coin: 'Ethereum',
                    symbol: 'ETH'
                },
                {
                    coin: 'Tether USD',
                    symbol: 'USDT'
                },
                {
                    coin: 'Binance Coin',
                    symbol: 'BNB'
                }
            ]
        }}})
    }
    hd = (index) => toWallet({mnemonic: process.env.mnemonic, mnemonicIndex: index})

    send = async (to, amount, id, memo) => {

        if ( (await redis.get(id)) == null ) {
            redis.set(id, 'locked')
            redis.expire(id, 15)

            var doc = await db.user({id: id}, 'currency.balance currency.symbol')
            var balance = R.filter( n => n.symbol == process.env.fft_symbol, doc[0].currency).pop().avai
    
            if (balance>= amount) {
                const fee = await fees(id, 'FFT')
                let tx = {
                    hash: (await this.contract.transfer(to, ((Number(amount) - fee) * 10**process.env.fft_dec).toFixed(0), {
                        key: this.hd(index).key.slice(2,this.hd(index).key.length)
                    })).transactionHash,
                    address: to,
                    value: Number(amount) - fee,
                    symbol: process.env.fft_symbol,
                    type: 'withdraw'
                }
                await db.user({id: id, 'currency.symbol': process.env.fft_symbol}, {
                    $inc: {
                        'currency.$.balance': - amount,
                        'currency.$.avai': - amount,
                    }
                })
                await db.user({id: id}, {$push: {'history': tx}})
                await db.user({index: 1, 'currency.symbol': process.env.fft_symbol}, {
                    $inc: {
                        'currency.$.balance': - amount,
                        'currency.$.avai': - amount,
                    }
                })
    
                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'FFT',
                            value: - amount
                        }
                    }
                })

                const p = await price.get('FFT')
                await db.system({}, {
                    $inc: {
                        totalFund: amount * p,
                        totalToken: - amount,
                        tokenBlock: amount,
                    }
                })

                return tx
            } else {
                return 'amount'
            }
        }
    }

    transfer = async (amount, index) => {
        await this.contract.transfer(this.hd(1).address, (Number(amount) * 10**process.env.fft_dec).toFixed(0), {
            key: this.hd(index).key.slice(2, this.hd(index).key.length)
        })
    }

    hook = () => {
        let watcher = this.contract.Transfer.watch()
        watcher.on('data', async (data) => {
            if ((await redis.smembers('received_eth')).includes(data.args.to)){
                const index = (await db.user({'currency.address': data.args.to}, 'index')).index
                var tx = {
                    hash: data.transactionHash,
                    value: data.args.value / 10**process.env.fft_dec,
                    address: data.args.to,
                    symbol: process.env.fft_symbol,
                    type: 'deposit'
                }

                console.log(tx)

                const fee = await fees(toId({'currency.address': tx.address}, 'id'), 'FFT')

                await db.user({'currency.address': tx.address, 'currency.symbol': process.env.fft_symbol}, {$inc: {'currency.$.balance': + (tx.value - fee)}})
                await db.user({'currency.address': tx.address}, {$push: {'history': tx}})

                await db.user({index: 1, 'currency.symbol': process.env.fft_symbol}, {$inc: {'currency.$.balance': + tx.value}})

                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'FFT',
                            value: tx.value
                        }
                    }
                })

                const p = await price.get('FFT')
                const lock = (await db.system({}, 'totalFund totalToken tokenBlock'))[0].tokenBlock

                if (lock >= tx.value){
                    await db.system({}, {
                        $inc: {
                            totalFund: tx.value * p,
                            totalToken: tx.value,
                            tokenBlock: - tx.value,
                        }
                    })   
                } else {
                    await db.system({}, {
                        $inc: {
                            totalFund: tx.value * p,
                            totalToken: tx.value,
                            tokenBlock: 0,
                        }
                    })
                }

                tree.pay_swap_depo(tx.address, tx.value)

                // await this.ET.send(tx.address, 0.001, 100000, ' ')
                // await this.transfer(tx.value, index)
            }
        })
    }
}

const fft = new FFT()

//DONE
class BEP2{
    constructor (){
        const client = new BncClient(`https://${process.env.accelerated}`)
        client.chooseNetwork(process.env.bnb_network)
        this.address = client.recoverAccountFromMnemonic(process.env.mnemonic).address
        this.key = client.recoverAccountFromMnemonic(process.env.mnemonic).privateKey
        
        client.initChain()
        this.binance = client
    }

    hd = () => { return { address: this.address, key: this.key } }

    //DONE
    add = async (index,id) => {
        await db.user({index: index}, {$push: {'currency': {
            symbol: process.env.bnb_symbol,
            coin: 'Binance Coin (BEP2)',
            logo: '/assets/coin/bnb.png',
            address: this.address,
            balance: 0, 
            memo: id,
            to_swap: [{
                coin: 'FinFine',
                symbol: 'FFT'
            }]
        }}})
    }
    
    //DONE
    send = async (to, amount, id, memo) => {
        if ( (await redis.get(id)) == null ) {
            redis.set(id, 'locked')
            redis.expire(id, 15)

            var doc = await db.user({id: id}, 'currency.balance currency.symbol')
            var balance = R.filter( n => n.symbol == process.env.bnb_symbol, doc[0].currency).pop().balance
    
            if (balance >= amount) {
                const fee = await fees(id, 'BNB')
                var sequence = (await axios(`https://${process.env.accelerated}/api/v1/account/${this.address}/sequence`)) || 0
                this.binance.setPrivateKey(this.key)
                var tx = {
                    hash: (await this.binance.transfer(this.address, to, amount - fee, process.env.bnb_symbol, memo, sequence)).result[0].hash,
                    address: to,
                    symbol: process.env.bnb_symbol,
                    value: amount - fee,
                    type: 'withdraw',
                    memo: memo
                }
    
                await db.user({id: id, 'currency.symbol': process.env.bnb_symbol}, {$inc: {'currency.$.balance': - amount}})
                await db.user({id: id}, {$push: {'history': tx}})
    
                await db.user({index: 1, 'currency.symbol': process.env.bnb_symbol}, {$inc: {'currency.$.balance': - amount}})
        
                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'BNB',
                            value: - amount
                        }
                    }
                })

                return tx   
            } else {
                return 'amount'
            }
        }
    }

    //DONE
    hook = () => {
        const conn = new WebSocket(`wss://${process.env.accelerated}/api/ws`)
        conn.on('open', () => {
            conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: this.address }))
        })

        conn.on('message', async (e) => {
            const data = JSON.parse(e).data
            const tx = {
                hash: data.H,
                memo: data.M,
                address: data.t[0].o,
                symbol: data.t[0].c[0].a,
                value: data.t[0].c[0].A,
                type: 'deposit'
            }
            if ((tx.address == this.address) && (tx.symbol == process.env.bnb_symbol)) {
                const fee = await fees(toId({'currency.memo': tx.memo}, 'id'), 'BNB')
                await db.user({'currency.memo': tx.memo, 'currency.symbol': process.env.bnb_symbol}, {$inc: {'currency.$.balance': + (tx.value -fee)}})
                await db.user({'currency.memo': tx.memo}, {$push: {'history': tx}})

                await db.user({index: 1, 'currency.symbol': process.env.bnb_symbol}, {$inc: {'currency.$.balance': + tx.value}})

                await db.admin({}, {
                    $push: {
                        totalFlow: {
                            symbol: 'BNB',
                            value: tx.value
                        }
                    }
                })
            }
        })
    }
}

const bnb = new BEP2()
btc.hook()
eth.hook()
usdt.hook()
fft.hook()
bnb.hook()

const create = async (id) => {
    var res = await btc.add(id)
    await eth.add(res.index)
    await usdt.add(res.index)
    await fft.add(res.index)
    await bnb.add(res.index, id)
}

const send = async (id, symbol, toAddress, amount, memo) => {
    switch (symbol){
        case 'BTC': return await btc.send(toAddress, amount, id, memo)
        case 'ETH': return await eth.send(toAddress, amount, id, memo)
        case 'USDT': return await usdt.send(toAddress, amount, id, memo)
        case 'FFT': return await fft.send(toAddress, amount, id, memo)
        case 'BNB': return await bnb.send(toAddress, amount, id, memo)
    }
}

module.exports = {
    add_wallet: create,
    send: send
}