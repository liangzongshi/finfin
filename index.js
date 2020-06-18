const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
require('dotenv').config()
const Redis = require("ioredis")
const redis = new Redis()

const DB = require('./db')
const db = new DB()

const mail = require('./mail')
const {encId, decId, getId} = require('./auth')
const airdrop = require('./airdrop')
const {randStr, random} = require('./util')
const md5 = require('md5')
const gg = require('./otp')
const tree = require('./tree')
const {add_wallet} = require('./wallet')
const {create_fund, add_scale, add_no_scale} = require('./finance')
const { router, payload, text, messenger } = require('bottender/router')

// https://m.me/lunadotjs?ref=123
// https://t.me/my_bot?start=123

const createAcc = async (info, data, typeChat, chatId) => {
    const sign = info
    sign.referral = data
    const password = randStr(8)
    const re_password = md5(password)
    sign.re_password = re_password

    sign.hash_password = encId(sign.re_password)
    var nowId = Number((await db.admin({role: 'admin'}, 'nowId'))[0].nowId)
    var seed = Number(random(1,8))
    var id = nowId + seed
    await db.admin({role: 'admin'}, {$inc: {nowId: seed}})
    await add_wallet(id)
    await create_fund(id)

    var referral = String(sign.referral)
    const dad = await db.user({id: referral}, 'id')
    if (dad.length == 0){
        referral = process.env.root_Id
    }
    tree.add_node(id, referral, sign)
    gg.add(id)

    if (referral !== process.env.root_Id){
        await db.user({id: id, 'currency.symbol': 'FFT'}, {
            $inc: {
                'currency.$.balance': + 25, 
                'currency.$.avai': + 25
            }
        })

        await db.user({id: referral, 'currency.symbol': 'FFT'}, {
            $inc: {
                'currency.$.balance': + 25, 
                'currency.$.avai': + 25
            }
        })
    }

    await redis.set(chatId, password)

    if (typeChat == 'msg'){
        await db.user({id: id}, {
            $set: {
                'massage.messenger.id': chatId
            }
        })
    }

    if (typeChat == 'tlg'){
        await db.user({id: id}, {
            $set: {
                'massage.telegram.id': chatId
            }
        })
    }
}

const handleCode = async (context) => {
    const raw = context.event.rawEvent
    const text = context.event.text
    const check = await redis.get(text)

    if ((context.platform == 'messenger') && (check !== null)){
        await db.user({id: check}, {
            $set: {
                'message.messenger.id': raw.sender.id, 
            }
        })

        await context.sendText(`verification successful! Your account has been synchronized.`)
    } else {
        await context.sendText(`The verification code is not available!`)
        return;
    }

    if ((context.platform == 'telegram') && (check !== null)){
        await db.user({id: check}, {
            $set: {
                'message.telegram.id': raw.message.chat.id, 
            }
        })

        await context.sendText(`verification successful! Your account has been synchronized.`, {
            reply_markup: {
                keyboard: [
                    ['🔍 Dashboard', '👥 Share'],
                    ['📢 Add', '⭐️ Link', '☸ Contact']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })

    } else {
        await context.sendText(`The verification code is not available!`)
        return;
    }
}

const msgStart = async (context) => {
    const res = await context.getUserProfile()
    const info = {
        last_name: res.lastName,
        first_name: res.firstName, 
    }
    const msgId = res.id
    const check = await db.user({'message.messenger.id': msgId}, 'id')
    if (check.length == 1){
        await context.sendText('Welcome back to the Finfine Assistant')
    } else {
        const referral = context.event.rawEvent.postback.referral
        var data
        if (referral == undefined){
            data = process.env.root_Id
        } else {
            data = referral.ref
        }
    
        if (data == 'finfine'){
            //Vao tu web
            await context.sendText('Enter your generated code:')
        } else {
            //Vao tu nen tang khac hoac link goc
            await createAcc(info, data, 'msg', msgId)
            await context.sendText('[ Preamble ]')
            await context.sendText(`In order for us to better support and 
            easily provide offers, please provide your Email address:`)
        }
    }
}

const tlgStart = async (context) => {
    const res = context.event.message.from
    const info = {
        last_name: res.lastName,
        first_name: res.firstName, 
    }
    const tlgId = res.id
    const check = await db.user({'message.telegram.id': msgId}, 'id')
    if (check.length == 1){
        await context.sendText('Welcome back to the Finfine Assistant', {
            reply_markup: {
                keyboard: [
                    ['🔍 Dashboard', '👥 Share'],
                    ['📢 Add', '⭐️ Link', '☸ Contact']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })

    } else {
        const referral = context.event.text.slice(7, context.event.text.length)
        var data
        
        if (referral == ''){
            data = process.env.root_Id
        } else {
            data = referral
        }
    
        if (data == 'finfine'){
            //Vao tu web
            await context.sendText('Enter your generated code:')
        } else {
            //Vao tu nen tang khac
            await createAcc(info, data, 'tlg', tlgId)
            await context.sendText('[ Preamble ]')
            await context.sendText(`In order for us to better support and 
            easily provide offers, please provide your Email address:`)
        }
    }
}

const handleEmail = async (context) => {
    const raw = context.event.rawEvent
    const email = context.event.text
    const check = await db.user({'info.email': email}, 'id')
    if (check.length == 1){
        await context.sendText('You are already a member of Finfine')
    } else {
        if (context.platform == 'messenger'){
            const msgId = raw.sender.id
            await db.user({'message.messenger.id': msgId}, {
                $set: {
                    'info.email': email
                }
            })

            mail(email, await redis.get(msgId)) // Gui Thong tin Mat Khau
        }

        if (context.platform == 'telegram'){
            const tlgId = raw.message.chat.id
            await db.user({'message.telegram.id': tlgId}, {
                $set: {
                    'info.email': email
                }
            })

            mail(email, await redis.get(tlgId)) // Gui Thong tin Mat Khau
        }

        await context.sendText('Check your inbox for account information and offers', {
            reply_markup: {
                keyboard: [
                    ['🔍 Dashboard', '👥 Share'],
                    ['📢 Add', '⭐️ Link', '☸ Contact']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }
}
const SHARE = async (context) => {
    const msgId = context.event.rawEvent.sender.id
    const id = (await db.user({'message.messenger.id': msgId}, 'id'))[0].id
    await context.sendMediaTemplate([
        {
            mediaType: 'image',
            url: 'https://www.facebook.com/photo.php?fbid=202498827633863',
            buttons: [
                {
                    type: 'web_url',
                    url: `https://m.me/${process.env.PAGE_USERNAME}?ref=${id}`,
                    title: 'FinFine',
                },
            ],
        },
    ])
}

const tlgShare = async (context) => {
    const text = 'XXXXXXXX'
    const tlgId = context.event.rawEvent.message.chat.id
    const id = (await db.user({'message.telegram.id': tlgId}, 'id'))[0].id
    await context.sendText('Done', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: `Share your friends`,
                    url: `https://t.me/share/url?url=https://t.me/${process.env.TELEGRAM_BOT}?start=${id}&text=${text}`
                }]
            ]}
        })
}

const test = async (context) => {
    await context.sendText('Done')
}

module.exports = async function App(context) {
    return router([
        payload('GET_STARTED', msgStart),
        text(/start/, tlgStart),

        payload('SHARE', SHARE),
        text('👥 Share', tlgShare),

        text(/^(\b(?=ff)\w+\b)$/, handleCode),

        text(regexMail, handleEmail),

        text('test', test)
    ])
}