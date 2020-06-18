const WebSocket = require('ws')

const infura = async () => {
    const ws = new WebSocket('wss://mainnet.infura.io/ws/v3/95d96f6402fa41459347dd947e59d900')
    ws.on('open', () => {
        console.log('Connected')
        ws.send(JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_subscribe',
            params: ['logs', {
                address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
                topics: [null]
            }],
            id: 1,
        }))
    })
    
    ws.on('message', async (data) => {
        console.log(JSON.stringify(JSON.parse(data), null, 2))
    })
}

const link = async () => {
    const ws = new WebSocket('wss://main-rpc.linkpool.io/ws')
    ws.on('open', () => {
        console.log('Connected')
        ws.send(JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_subscribe',
            params: ['logs', {
                address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
                topics: [null]
            }],
            id: 1,
        }))
    })
    
    ws.on('message', async (data) => {
        console.log(JSON.stringify(JSON.parse(data), null, 2))
    })
}

const amber = async () => {
    const ws = new WebSocket('wss://ws.web3api.io?x-api-key=UAKe4a621e242ebe008e9edf5beddc8edb9&x-amberdata-blockchain-id=ethereum-mainnet')
    ws.on('open', () => {
        console.log('Connected')
        ws.send(JSON.stringify({
            jsonrpc: '2.0',
            method: 'subscribe',
            params: ['address:transactions', {
                address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE'
            }],
            id: 1,
        }))

        ws.send(JSON.stringify({
            jsonrpc: '2.0',
            method: 'subscribe',
            params: ['address:transactions', {
                address: '0xD551234Ae421e3BCBA99A0Da6d736074f22192FF'
            }],
            id: 1,
        }))

    })

    ws.on('message', async (data) => {
        console.log(JSON.stringify(JSON.parse(data), null, 2))
    })
}

var connected = false
const ws = new WebSocket('wss://ws.web3api.io?x-api-key=UAKe4a621e242ebe008e9edf5beddc8edb9&x-amberdata-blockchain-id=ethereum-mainnet')
ws.on('open', () => {
    console.log('Connected')
    connected = true
})

ws.on('message', async (data) => {
    // console.log(JSON.stringify(JSON.parse(data), null, 2))
    const res = JSON.parse(data)
    if (res.id !== 1){
        console.log(res.params.result)
    }

})

setTimeout(()=>{
    ws.send(JSON.stringify({
        jsonrpc: '2.0',
        method: 'subscribe',
        params: ['address:transactions', {
            address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE'
        }],
        id: 1,
    }))
},2000)