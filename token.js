require('dotenv').config()
const axios = require('axios')

const DB = require('./db')
const db = new DB()

const Redis = require("ioredis")
const redis = new Redis()

const tree = require('./tree')

const {unixTo, randStr, sDay, sMonth} = require('./util')

const Binance = require('binance-api-node').default
const bnb = new Binance()

const ObjectsToCsv = require('objects-to-csv')

const findId = async (param) => {
    const checkId = (await db.user({id: param},'id'))[0]
    if (checkId !== undefined){
        return checkId.id
    }
    const checkMobile = (await db.user({'info.mobile': param},'id'))[0]
    if (checkMobile !== undefined){
        return checkMobile.id
    }
    const checkEmail = (await db.user({'info.email': param},'id'))[0]
    if (checkEmail !== undefined){
        return checkEmail.id
    }
}

class Price {
    get = async (symbol) => {
        if (symbol == 'FFT'){
            var doc = (await db.system({}, 'totalFund totalToken'))[0] 
            var price = doc.totalFund / doc.totalToken
            return price.toFixed(4)
        }

        if (symbol == 'USDT'){
            return 1
        }

        const pairs = await bnb.prices()
        var price = pairs[`${symbol}USDT`]
        return Number(price).toFixed(4)
    }

    rate = async (symbol_X, symbol_Y) => {
        const priceX = await this.get(symbol_X)
        const priceY = await this.get(symbol_Y)
        return (priceX / priceY).toFixed(2)
    }

    swap = async (id, symbol_X, symbol_Y, amount) => {
        const currencies = (await db.user({id: id}, 'currency'))[0].currency
        const X = (currencies.filter( currency => currency.symbol == symbol_X))[0]
        var balance
        if (symbol_X == 'FFT'){
            balance = X.avai
        } else {
            balance = X.balance
        }

        if (balance >= amount){
            const price = await this.rate(symbol_X, symbol_Y)
            // console.log(price)
            const Y = (price * amount).toFixed(4)
            await db.user({id: id, 'currency.symbol': symbol_X}, {
                $inc: {
                    'currency.$.balance': - amount
                }
            })

            if (symbol_X == 'FFT'){
                await db.user({id: id, 'currency.symbol': symbol_X}, {
                    $inc: {
                        'currency.$.avai': - amount
                    }
                })
            }

            await db.user({id: id, 'currency.symbol': symbol_Y}, {
                $inc: {
                    'currency.$.balance': Y
                }
            })

            await db.user({id: id}, {
                $push: {
                    history: {
                        type: 'swap',
                        symbol: symbol_Y,
                        hash: 'FFT' + randStr(29),
                        address: X.address,
                        value: Y,
                        price: price,
                        memo: id,
                    }
                }
            })

            if (symbol_Y == 'FFT'){
                const y_price = await this.get(symbol_y)
                const lock = (await db.system({}, 'totalFund totalToken tokenBlock'))[0].tokenBlock
                if (lock >= amount){
                    await db.system({}, {
                        $inc: {
                            totalFund: amount * x_price,
                            totalToken: amount,
                            tokenBlock: - amount,
                        }
                    })   
                } else {
                    await db.system({}, {
                        $inc: {
                            totalFund: amount * x_price,
                            totalToken: amount,
                            tokenBlock: 0,
                        }
                    })
                }

                tree.pay_swap_depo(id, Y)
            }

            if (symbol_X == 'FFT'){
                const x_price = await this.get(symbol_x)
                await db.system({}, {
                    $inc: {
                        totalFund: amount * x_price,
                        totalToken: - amount,
                        tokenBlock: amount,
                    }
                })
            }
        }
    }

    switch = async (id, to, symbol, amount) => {
        const toId = await findId(to)
        var doc = await db.user({id: id }, 'currency.balance currency.symbol')
        var X = R.filter( n => n.symbol == symbol, doc[0].currency).pop()
        var balance
        if (symbol == 'FFT'){
            balance = X.avai
        } else {
            balance = X.balance
        }
        if (balance >= amount) {
            await db.user({id: id, 'currency.symbol': symbol}, {
                $inc :{
                    'currency.$.balance': - amount
                },
                $push: {
                    history: {
                        type: 'switch',
                        symbol: symbol,
                        hash: 'FFT' + randStr(29),
                        address: to,
                        value: amount,
                        memo: id,
                    }
                }
            })

            if (symbol_X == 'FFT'){
                await db.user({id: id, 'currency.symbol': symbol}, {
                    $inc: {
                        'currency.$.avai': - amount
                    }
                })
            }

            await db.user({id: toId, 'currency.symbol': symbol}, {
                $inc :{
                    'currency.$.balance': amount
                },
                $push: {
                    history: {
                        type: 'switch',
                        symbol: symbol,
                        hash: 'FFT' + randStr(29),
                        address: id,
                        value: amount,
                        memo: toId,
                    }
                }
            })

            if (symbol == 'FFT'){
                tree.pay_swap_depo(toId, amount)
            }
            return toId
        } else {
            return 'amount'
        }
    }

    assetsTotal = async (id, cb) => {
        const currencies = (await db.user({id: id}, 'currency'))[0].currency
        var total = 0
        currencies.forEach(async (currency, st) => {
            const price = await this.get(currency.symbol)
            total += currency.balance * price
            if (st == currencies.length -1){
                const priceFFT = await this.get('FFT')
                cb({
                    USD: total.toFixed(4),
                    FFT: ( total / priceFFT ).toFixed(4)
                })
            }
        })
    }

    capitalTotal = async (id) => {
        const currencies = (await db.user({id: id}, 'currency'))[0].currency
        const X = (currencies.filter( currency => currency.symbol == 'FFT'))[0]
        const price = await this.get('FFT')
        return {
            USD: (X.balance * price).toFixed(4),
            FFT: X.balance.toFixed(4)
        }
    }

    profitTotal = async (id) => {
        const profits = (await db.user({id: id}, 'received'))[0].received
        const price = await this.get('FFT')
        var total = 0
        profits.forEach((profit) => {
            total += profit.value
        })

        return {
            USD: (total * price).toFixed(4),
            FFT: total.toFixed(4)
        }
    }

    salesTotal = async (id) => {
        const childrens = await db.user({list_dad: id}, 'id history')
        const price = await this.get('FFT')
        var total = 0
        childrens.forEach(async (child, st) => {
            child.history.forEach( async (his) => {
                if ((his.symbol == 'FFT') && ((his.type == 'deposit') || (his.type == 'swap') || ((his.type == 'switch') && (his.memo == child.id)))){
                    total += his.value
                }
            })
        })
        return {
            FFT: total.toFixed(4),
            USD: (total * price).toFixed(4)
        }
    }

    salesRefTotal = async (id) => {
        const childrens = await db.user({list_dad: id}, 'id history list_dad')
        const price = await this.get('FFT')
        var total = 0
        childrens.forEach(async (child, st) => {
            if (child.list_dad[0] == id){
                child.history.forEach( async (his) => {
                    if ((his.symbol == 'FFT') && ((his.type == 'deposit') || (his.type == 'swap') || ((his.type == 'switch') && (his.memo == child.id)))){
                        total += his.value
                    }
                })
            }
        })
        return {
            FFT: total.toFixed(4),
            USD: (total * price).toFixed(4)
        }
    }

    //Them gia theo USD cho toan bo 
    totalByTime = async (id, timeskip = 0) => {
        const me = (await db.user({id: id}, 'history received'))[0]
        const myChilds = await db.user({list_dad: id}, 'id history list_dad')

        var totalDepDay = 0, totalDepMonth = 0, totalWitDay = 0, totalWitMonth = 0, totalSwapDay = 0, totalSwapMonth = 0, totalSwapOutDay = 0, totalSwapOutMonth = 0
        var totalSwitchInDay = 0, totalSwitchInMonth = 0, totalSwitchOutDay = 0,  totalSwitchOutMonth = 0
        me.history.forEach( async (his,st) => {
            if (his.symbol == 'FFT'){
                switch (his.type){
                    case 'deposit': {
                        if (sDay(his.timestamp, timeskip)){
                            totalDepDay += his.value
                        }

                        if (sMonth(his.timestamp, timeskip)){
                            totalDepMonth += his.value
                        }
                    }

                    case 'withdraw' : {
                        if (sDay(his.timestamp, timeskip)){
                            totalWitDay += his.value
                        }

                        if (sMonth(his.timestamp, timeskip)){
                            totalWitMonth += his.value
                        }
                    }

                    case 'swap' : {
                        if (sDay(his.timestamp, timeskip)){
                            totalSwapDay += his.value
                        }

                        if (sMonth(his.timestamp, timeskip)){
                            totalSwapMonth += his.value
                        }
                    }

                    case 'switch' : {
                        if (his.memo == id){
                            if (sDay(his.timestamp, timeskip)){
                                totalSwitchInDay += his.value
                            }
                            
                            if (sMonth(his.timestamp, timeskip)){
                                totalSwitchInMonth += his.value
                            }
                        } else {
                            if (sDay(his.timestamp, timeskip)){
                                totalSwitchOutDay += his.value
                            }
    
                            if (sMonth(his.timestamp, timeskip)){
                                totalSwitchOutMonth += his.value
                            }
                        }
                    }
                }
            } else {
                if (his.type = 'swap'){
                    if (sDay(his.timestamp, timeskip)){
                        totalSwapOutDay += his.value / his.price
                    }

                    if (sMonth(his.timestamp, timeskip)){
                        totalSwapOutMonth += his.value / his.price
                    }
                }
            }
        })

        var totalDirComDay = 0, totalDirComMonth = 0, totalStaIntDay = 0, totalStaIntMonth = 0, totalDynIntDay = 0, totalDynIntMonth = 0, totalIndComDay = 0, totalIndComMonth = 0
        me.received.forEach( async (his, st) => {
            switch (his.type){
                case 'direct_commission' : {
                    if (sDay(his.timestamp, timeskip)){
                        totalDirComDay += his.value
                    }
                    
                    if (sMonth(his.timestamp, timeskip)){
                        totalDirComMonth += his.value
                    }
                }
                
                case 'static_interest' : {
                    if (sDay(his.timestamp, timeskip)){
                        totalStaIntDay += his.value
                    }

                    if (sMonth(his.timestamp, timeskip)){
                        totalStaIntMonth += his.value
                    }
                }
                
                case 'dynamic_interest' : {
                    if (sDay(his.timestamp, timeskip)){
                        totalDynIntDay += his.value
                    }

                    if (sMonth(his.timestamp, timeskip)){
                        totalDynIntMonth += his.value
                    }
                }
                
                case 'indirect_commission' : {
                    if (sDay(his.timestamp, timeskip)){
                        totalIndComDay += his.value
                    }

                    if (sMonth(his.timestamp, timeskip)){
                        totalIndComMonth += his.value
                    }
                }
            }
        })

        var totalSaleDay = 0, totalSaleMonth = 0, totalRefSaleDay = 0, totalRefSaleMonth = 0
        myChilds.forEach( async (child, st) => {
            if (child.list_dad[0] == id){
                child.history.forEach( async (his, st) => {
                    if ((his.symbol == 'FFT') && ((his.type == 'deposit') || (his.type == 'swap') || ((his.type == 'switch') && (his.memo == child.id)))){
                        if (sDay(his.timestamp, timeskip)){
                            totalRefSaleDay += his.value
                        }

                        if (sMonth(his.timestamp, timeskip)){
                            totalRefSaleMonth += his.value
                        }
                    }
                })
            }
            
            child.history.forEach( async (his, st) => {
                if ((his.symbol == 'FFT') && ((his.type == 'deposit') || (his.type == 'swap') || ((his.type == 'switch') && (his.memo == child.id)))){
                    if (sDay(his.timestamp, timeskip)){
                        totalSaleDay += his.value
                    }

                    if (sMonth(his.timestamp, timeskip)){
                        totalSaleMonth += his.value
                    }
                }
            })
        })

        return {
            days: {
                flows: {
                    deposit: totalDepDay,
                    withdraw: totalWitDay,
                    swap: {
                        to: totalSwapDay,
                        out: totalSwapOutDay
                    },
                    switch: {
                        to: totalSwitchInDay,
                        out: totalSwitchOutDay
                    }
                },
                profits: {
                    direct_commission: totalDirComDay,
                    static_interest: totalStaIntDay,
                    dynamic_interest: totalDynIntDay,
                    indirect_commission: totalIndComDay 
                },
                sales: totalSaleDay,
                ref: totalRefSaleDay
            },
            months: {
                flows: {
                    deposit: totalDepMonth,
                    withdraw: totalWitMonth,
                    swap: {
                        to: totalSwapMonth,
                        out: totalSwapOutMonth
                    },
                    switch: {
                        to: totalSwitchInMonth,
                        out: totalSwitchOutMonth
                    }
                },
                profits: {
                    direct_commission: totalDirComMonth,
                    static_interest: totalStaIntMonth,
                    dynamic_interest: totalDynIntMonth,
                    indirect_commission: totalIndComMonth 
                },
                sales: totalSaleMonth,
                ref: totalRefSaleMonth
            }
        }
    }

    trading = async (timeskip = 0) => {
        const fund = await db.system({}, 'totalFund totalToken tokenBlock totalOrder totalProfit profitDaily pay')
        var totalDay = fund.profitDaily[fund.profitDaily.length -1]
        var totalMonth = 0
        fund.profitDaily.forEach((daily) => {
            if (sMonth(daily.timestamp, timeskip)){
                totalMonth += daily.value
            }
        })
        var totalPayDay = fund.pay[fund.pay.length -1]
        var totalPayMonth = 0
        fund.pay.forEach(async (paid, st) =>{
            if (sMonth(paid.timestamp, timeskip)){
                totalPayMonth += pay.value
            }
        })
        return {
            capital: fund.totalFund,
            activeToken: fund.totalToken,
            blockedToken: fund.tokenBlock,
            order: fund.totalOrder,
            profit: fund.totalProfit,
            days: totalDay,
            months: totalMonth,
            pay_days: totalPayDay,
            pay_months: totalPayMonth
        }
    }

    writeLog = async () => {
        const orders = (await db.system({}, 'orders'))[0].orders
        if (orders.length == 20000){
            const keep = orders.slice(10000, 20000)
            await db.system({}, {
                $set: {
                    orders: keep
                }
            })
            const logs = orders.slice(0, 10000)
            const name = (Date.now()).toString()
            const csv = new ObjectsToCsv(logs)
            await csv.toDisk(`./storage/${name}.csv`, { bom: true })
        }
    }

    liveOrder = async () => {
        const orders = (await db.system({}, 'orders'))[0].orders
        if (orders.length <= 10000){
            return orders
        } else {
            return orders.slice(orders.length - 10000, orders.length)
        }
    }

    basicAdmin = async (timeskip =0) => {
        const flows = (await db.admin({}, 'totalFlow'))[0].totalFlow
        var btcDepMonth = 0, btcDepDay = 0, btcWitMonth = 0, btcWitDay = 0, btcDep = 0, btcWit = 0
        var ethDepMonth = 0, ethDepDay = 0, ethWitMonth = 0, ethWitDay = 0, ethDep = 0, ethWit = 0
        var usdtDepMonth = 0, usdtDepDay = 0, usdtWitMonth = 0, usdtWitDay = 0, usdtDep = 0, usdtWit = 0
        var bnbDepMonth = 0, bnbDepDay = 0, bnbWitMonth = 0, bnbWitDay = 0, bnbDep = 0, bnbWit = 0
        var fftDepMonth = 0, fftDepDay = 0, fftWitMonth = 0, fftWitDay = 0, fftDep = 0, fftWit = 0

        flows.forEach( async (flow, st) => {
            switch(flow.symbol){
                case 'BTC': {
                    btcDep +=flow.value
                    if (flow.value > 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            btcDepMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            btcDepDay +=flow.value
                        }
                    }
                    btcWit +=flow.value
                    if (flow.value < 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            btcWitMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            btcWitDay +=flow.value
                        }
                    }
                }
                case 'ETH': {
                    ethDep +=flow.value
                    if (flow.value > 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            ethDepMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            ethDepDay +=flow.value
                        }
                    }
                    ethWit +=flow.value
                    if (flow.value < 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            ethWitMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            ethWitDay +=flow.value
                        }
                    }
                }
                case 'USDT': {
                    usdtDep +=flow.value
                    if (flow.value > 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            usdtDepMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            usdtDepDay +=flow.value
                        }
                    }
                    usdtWit +=flow.value
                    if (flow.value < 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            usdtWitMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            usdtWitDay +=flow.value
                        }
                    }
                }
                case 'BNB': {
                    bnbDep +=flow.value
                    if (flow.value > 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            bnbDepMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            bnbDepDay +=flow.value
                        }
                    }
                    bnbWit +=flow.value
                    if (flow.value < 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            bnbWitMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            bnbWitDay +=flow.value
                        }
                    }
                }
                case 'FFT': {
                    fftDep +=flow.value
                    if (flow.value > 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            fftDepMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            fftDepDay +=flow.value
                        }
                    }
                    fftWit +=flow.value
                    if (flow.value < 0){
                        if (sMonth(flow.timestamp, timeskip)){
                            fftWitMonth +=flow.value
                        }

                        if (sDay(flow.timestamp, timeskip)){
                            fftWitDay +=flow.value
                        }
                    }
                }
            }
        })

        return {
            btc: {
                deposit: {
                    months: btcDepMonth,
                    days: btcDepDay,
                    full: btcDep
                },
                withdraw: {
                    months: btcWitMonth,
                    days: btcWitDay,
                    full: btcWit
                }
            },
            eth: {
                deposit: {
                    months: ethDepMonth,
                    days: ethDepDay,
                    full: ethDep
                },
                withdraw: {
                    months: ethWitMonth,
                    days: ethWitDay,
                    full: ethWit
                }
            },
            usdt: {
                deposit: {
                    months: usdtDepMonth,
                    days: usdtDepDay,
                    full: usdtDep
                },
                withdraw: {
                    months: usdtWitMonth,
                    days: usdtWitDay,
                    full: usdtWit
                }
            },
            bnb: {
                deposit: {
                    months: bnbDepMonth,
                    days: bnbDepDay,
                    full: bnbDep
                },
                withdraw: {
                    months: bnbWitMonth,
                    days: bnbWitDay,
                    full: bnbWit
                }
            },
            fft: {
                deposit: {
                    months: fftDepMonth,
                    days: fftDepDay,
                    full: fftDep
                },
                withdraw: {
                    months: fftWitMonth,
                    days: fftWitDay,
                    full: fftWit
                }
            }
        }
    }
}

const price = new Price()

module.exports = price
