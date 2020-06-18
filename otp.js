const DB = require('./db')
const db = new DB()
const { authenticator} = require('otplib')
const qrcode = require('qrcode')

class GG {
    constructor(service = 'Digigo.org'){
        this.service = service
    }
    generate = async (id) => {
        var secret = authenticator.generateSecret()
        var user = (await db.user({id: id}, {$set: {'secure.google': secret}})).info.email
        const otpauth = authenticator.keyuri(user, this.service, secret)
        return await qrcode.toDataURL(otpauth)
    }
    add = async (id) => {
        var secret = authenticator.generateSecret()
        console.log(secret)
        await db.user({id: id}, {$set: {'secure.google': secret}})
    }
    get = async (id) => {
        var doc = await db.user({id: id}, 'secure.google info.email')
        var secret = doc[0].secure.google
        var user = doc[0].info.email
        const otpauth = authenticator.keyuri(user, this.service, secret)
        return await qrcode.toDataURL(otpauth)
    }
    check = async (id, token) => {
        var secret = (await db.user({id: id}, 'secure.google'))[0].secure.google
        return authenticator.check(token, secret)
    }
    token = (secret) => authenticator.generate(secret)
}

const gg = new GG()
module.exports = gg