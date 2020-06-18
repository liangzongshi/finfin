require('dotenv').config()
const Redis = require("ioredis")
const redis = new Redis()

const DB = require('./db')
const db = new DB()
const {add_wallet} = require('./wallet')

const root = {
    first_name: 'Root',
    last_name: 'Root',
    email: 'root@digigo.org',
    hash_password: 'ed39921021b8616f969966d1be1cd32a9105fdd452dc7ffe7e371c5d450b265c'
}

const admin = {
    first_name: 'Admin',
    last_name: 'Admin',
    email: 'admin@digigo.org',
    hash_password: 'ed39921021b8616f969966d1be1cd32a9105fdd452dc7ffe7e371c5d450b265c'
}

const info = {
    first_name: 'Info',
    last_name: 'Info',
    email: 'info@digigo.org',
    hash_password: 'ed39921021b8616f969966d1be1cd32a9105fdd452dc7ffe7e371c5d450b265c'
}

const init = async () => {
    await redis.set('index_wallet', 1)
    await redis.set('profitDay', 0)
    await db.admin({
        nowId: process.env.root_Id
    })

    await add_wallet(100000)
    await db.user({id: 100000}, {$set: {info: root, list_dad: [null, null, null]}})
    await add_wallet(100001)
    await db.user({id: 100001}, {$set: {info: info, list_dad: [100000, null, null]}})
    await add_wallet(100002)
    await db.user({id: 100002}, {$set: {info: admin, list_dad: [100000, null, null]}})

    await db.system({})
    process.exit()
}

init()