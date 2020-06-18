require('dotenv').config()
const aes = require('aes-js')

const encrypt = (text) => {
    const data = aes.utils.utf8.toBytes(text)
    const key = aes.utils.utf8.toBytes(process.env.auth_key)

    const iv = new aes.Counter(2020)
    const aesCtr = new aes.ModeOfOperation.ctr(key, iv)
    const encryptedBytes = aesCtr.encrypt(data)

    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes)
    return encryptedHex
}

const decrypt = (encryptedHex) => {
    const encryptedBytes = aes.utils.hex.toBytes(encryptedHex)
    const key = aes.utils.utf8.toBytes(process.env.auth_key)

    const iv = new aes.Counter(2020)

    const aesCtr = new aes.ModeOfOperation.ctr(key, iv)
    const decryptedBytes = aesCtr.decrypt(encryptedBytes)
    
    const text = aes.utils.utf8.fromBytes(decryptedBytes)
    return text
}

const get = (protocol, type = 'socket') => {
    if (type == 'socket') {
        const user = protocol.handshake.session.user
        const id = (user == undefined) ? false : user.id
        return id
    }
    const user = protocol.session.user
    const id = (user == undefined) ? false : user.id
    return id
}

module.exports = {
    encId: encrypt,
    decId: decrypt,
    getId: get
}