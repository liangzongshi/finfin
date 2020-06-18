require('dotenv').config()
const R = require('ramda')
const DB = require('./db')
const db = new DB()
const {add_wallet} = require('./wallet')
const tree = require('./tree')
const {encId, decId, getId} = require('./auth')
const gg = require('./otp')
const {create_fund, add_scale, add_no_scale} = require('./finance')
const fsExtra = require('fs-extra')
const path = require('path')
const { createNoti, countNoti } = require('./notification')
const {random} = require('./util')

function xoa_dau(str){
    str = str.replace(/\s+/g, ' ');
   str = str.trim();
   str = str.toLowerCase();
   str = str.split(' ').join("-")
   return str;
}

module.exports = (app) => {
    app.get('/register', async (req, res) => {
        if ( !!getId(req,'') ){
            res.redirect('/invest')
            return
        }
        res.render('register', { referral: req.query.referral })
    })

    app.get('/login', async (req, res) => {
        if ( !!getId(req,'') ){
            res.redirect('/invest')
            return
        }
        res.render('login')
    })

    app.post('/invest', async (req, res) => {
        const sign = req.body
        if (sign.code !== undefined){
            sign.hash_password = encId(sign.re_password)
            var nowId = Number((await db.admin({role: 'admin'}, 'nowId'))[0].nowId)
            var seed = Number(random(1,8))
            var id = nowId + seed
            await db.admin({role: 'admin'}, {$inc: {nowId: seed}})
            await add_wallet(id)

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
            
            req.session.user = {
                id: encId(id),
            }
            res.render('invest', {
                id: id
            })
        } else {
            const email = sign.login_email
            const hash_md5 = sign.cef
            var user = await db.user({'info.email': email},'id info.email info.hash_password')
            if (user.length == 0){
                res.redirect('/login')
            } else {
                const hash_password = user[0].info.hash_password
                const id = user[0].id
                if (hash_md5 == decId(hash_password)){
                    req.session.user = {
                        id: encId(id),
                    }
                    const idNow = decId(getId(req,''))
                    const user = await db.user({id:idNow}, "info")
                    res.render('invest', {
                        title: "DIGIGO | Invest",
                        userInfo: user[0].info,
                        role: user[0].role,
                        id: id,

                    })
                } else {
                    res.redirect('/login')
                }
            }
        }
    })

    app.get('/invest', async (req, res) => {
        
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info")
            res.render('invest', {
                title: "DIGIGO | Investment",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/trading', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info")
            res.render('trading', {
                title: "DIGIGO | Trading",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/timeline', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info role history')
            const histories = user[0].history
            res.render('timeline', {
                title: "FINFINE | Timeline",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/market', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info")
            res.render('market', {
                title: "DIGIGO | Market",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/balance', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info currency')
            const currencies = user[0].currency
            res.render('balance', {
                title: "DIGIGO | Balance",
                userInfo: user[0].info,
                role: user[0].role,
                currencies: currencies
            })    
        } else {
            res.redirect('/login')
        }
    })

    app.get('/deposit', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info history')
            const histories = user[0].history
            res.render('deposit', {
                title: "DIGIGO | Deposit",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/withdraw', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info history')
            const histories = user[0].history
            res.render('withdraw', {
                title: "DIGIGO | Withdraw",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/swap', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info history')
            const histories = user[0].history
            res.render('swap', {
                title: "DIGIGO | Swap",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/switch', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info role history')
            const histories = user[0].history
            res.render('switch', {
                title: "FINFINE | Switch",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/mybonus', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info role history')
            const histories = user[0].history
            res.render('mybonus', {
                title: "FINFINE | My Bonus",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/bonus', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info role history')
            const histories = user[0].history
            res.render('bonus', {
                title: "FINFINE | Bonus",
                userInfo: user[0].info,
                role: user[0].role,
                histories: histories
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/airdrop', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info")
            res.render('airdrop', {
                title: "DIGIGO | Airdrop",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/finance', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, 'info')
            var user_fin 
            if(user[0].info.kyc === true){
                const Sump = R.filter( n => n.name == 'SUMP', user[0].info.finance_fund).pop().balance
                const Edu = R.filter( n => n.name == 'EDU', user[0].info.finance_fund).pop().balance
                const Inv = R.filter( n => n.name == 'INV', user[0].info.finance_fund).pop().balance
                const Play = R.filter( n => n.name == 'PLAY', user[0].info.finance_fund).pop().balance
                const Save = R.filter( n => n.name == 'SAVE', user[0].info.finance_fund).pop().balance
                const Loan = R.filter( n => n.name == 'LOAN', user[0].info.finance_fund).pop().balance
                const Debt = R.filter( n => n.name == 'DEBT', user[0].info.finance_fund).pop().balance
                const histories = user[0].info.finance_history.sort((a,b)=> a.date-b.date)
                user_fin = {
                    total: user[0].info.finance_total,
                    Sump: Sump,
                    Edu: Edu,
                    Inv: Inv,
                    Play: Play,
                    Save: Save,
                    Loan: Loan,
                    Debt: Debt,
                    histories: histories
                }
            }
            
            res.render('finance', {
                "title": "DIGIGO | Finance Management",
                userInfo: user[0].info,
                role: user[0].role,
                UserFinance: user_fin
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/news/:page', async (req, res) => {
        var perPage = 9
        var page = req.params.page || 1
        const posts = await db.Paper.find({}).skip((perPage * page) - perPage).limit(perPage)
        posts.forEach(async (post) => {
            post.link = await xoa_dau(post.sub)
            var byUser = await db.user({id: post.writer}, "info.first_name info.last_name")
            post.by = byUser[0].info.first_name + " " + byUser[0].info.last_name
        })
        const count = await db.Paper.countDocuments({})
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('news', {
                title: "FINFINE | News",
                userInfo: user[0].info,
                role: user[0].role,
                posts: posts,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/details/:news', async (req,res)=>{
        const nid = (req.params.news).split('-.-')[1]
        const currentNews = await db.Paper.findOne({newsId: nid})
        const byUser = await db.user({id: currentNews.writer}, "info.first_name info.last_name")
        currentNews.by = byUser[0].info.first_name + " " + byUser[0].info.last_name
        const nextNews = await db.Paper.findOne({_id: {$gt: currentNews._id}}).sort({_id: 1})
        const prevNews = await db.Paper.findOne({_id: {$lt: currentNews._id}}).sort({_id: -1})
        const linkCurrent = xoa_dau(currentNews.sub)
        const posts = await db.Paper.find({}).limit(5)
        posts.forEach(async (post) => {
            post.link = await xoa_dau(post.sub)
        })
        var linkNext, linkPrev
        if(nextNews != null){
            linkNext = xoa_dau(nextNews.sub)
        }
        if(prevNews != null){
            linkPrev = xoa_dau(prevNews.sub)
        }
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('details', { 
                title: "FINFINE | " + currentNews.sub,
                role: user[0].role,
                userInfo: user[0].info,
                currentNews: currentNews,
                nextNews: nextNews,
                prevNews: prevNews,
                linkPrev: linkPrev,
                linkNext: linkNext,
                linkCurrent: linkCurrent,
                posts: posts
             })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/upload', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            if(user[0].role === "editor" || user[0].role === "admin"){
                res.render('upload', {
                    title: "FINFINE | Upload News",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            }else{
                res.redirect('/invest')
            }
            
        } else {
            res.redirect('/login')
        }
    })
    app.get('/tree', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('tree', {
                title: "FINFINE | Tree",
                userInfo: user[0].info,
                role: user[0].role,
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/list', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('list', {
                title: "FINFINE | Lists",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/map', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('map', {
                title: "FINFINE | Map",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/group', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('group', {
                title: "FINFINE | Group",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/events/:page', async (req, res) => {
        var perPage = 8
        var page = req.params.page || 1
        const events = await db.Event.find({}).skip((perPage * page) - perPage).limit(perPage)
        events.forEach(async (event) => {
            event.link = await xoa_dau(event.title)
        })
        const count = await db.Event.countDocuments({})
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('events', {
                title: "FINFINE | News",
                userInfo: user[0].info,
                role: user[0].role,
                events: events,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/details-event/:event', async (req,res)=>{
        const eid = (req.params.event).split('-.-')[1]
        const currentEvent = await db.Event.findOne({eventId: eid})
        const nextEvent = await db.Event.findOne({_id: {$gt: currentEvent._id}}).sort({_id: 1})
        const prevEvent = await db.Event.findOne({_id: {$lt: currentEvent._id}}).sort({_id: -1})
        const linkCurrent = xoa_dau(currentEvent.title)
        const events = await db.Event.find({}).limit(5)
        events.forEach(async (event) => {
            event.link = await xoa_dau(event.title)
        })
        var linkNext, linkPrev
        if(nextEvent != null){
            linkNext = xoa_dau(nextEvent.title)
        }
        if(prevEvent != null){
            linkPrev = xoa_dau(prevEvent.title)
        }
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('details-event', { 
                title: "FINFINE | " + currentEvent.title,
                role: user[0].role,
                userInfo: user[0].info,
                currentEvent: currentEvent,
                nextEvent: nextEvent,
                prevEvent: prevEvent,
                linkPrev: linkPrev,
                linkNext: linkNext,
                linkCurrent: linkCurrent,
                events: events
             })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/top', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('top', {
                title: "FINFINE | Top",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/token', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id:id}, "info role")
            res.render('token', {
                title: "FINFINE | Token",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/follow', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('follow', {
                title: "FINFINE | Follow",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/livestream', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('livestream', {
                title: "FINFINE | Livestream",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/generalinformation/:page', async (req, res) => {
        var perPage = 8
        var page = req.params.page || 1
        await db.Doc.deleteMany({"link": null})
        const docs = await db.Doc.find({typeDoc: "general"}).skip((perPage * page) - perPage).limit(perPage)
        const count = await db.Doc.countDocuments({typeDoc: "general"})
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('generalinformation', {
                title: "FINFINE | General Information",
                userInfo: user[0].info,
                role: user[0].role,
                docs: docs,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/upload-document', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            await db.Doc.deleteMany({"link": null})
            if(user[0].role === "editor" || user[0].role === "admin"){
                res.render('upload-document', {
                    title: "FINFINE | Upload Document",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            }else{
                res.redirect('/invest')
            }
            
        } else {
            res.redirect('/login')
        }
    })
    app.get('/edit-document/:docId', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            await db.Doc.deleteMany({"link": null})
            const docId = req.params.docId
            const doc = await db.Doc.findOne({docId: docId})
            if(user[0].role === "editor" || user[0].role === "admin"){
                res.render('edit-document', {
                    title: "FINFINE | Edit Document",
                    userInfo: user[0].info,
                    role: user[0].role,
                    doc: doc
                })
            }else{
                res.redirect('/invest')
            }
            
        } else {
            res.redirect('/login')
        }
    })

    app.get('/financialreport/:page', async (req, res) => {
        var perPage = 8
        var page = req.params.page || 1
        await db.Doc.deleteMany({"link": null})
        const docs = await db.Doc.find({typeDoc: "report"}).skip((perPage * page) - perPage).limit(perPage)
        const count = await db.Doc.countDocuments({typeDoc: "report"})
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('financialreport', {
                title: "FINFINE | Finance Reports",
                userInfo: user[0].info,
                role: user[0].role,
                docs: docs,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/marketing/:page', async (req, res) => {
        var perPage = 8
        var page = req.params.page || 1
        await db.Doc.deleteMany({"link": null})
        const docs = await db.Doc.find({typeDoc: "marketing"}).skip((perPage * page) - perPage).limit(perPage)
        const count = await db.Doc.countDocuments({typeDoc: "marketing"})
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id:id}, "info role")
            res.render('marketing', {
                title: "FINFINE | Marketing",
                userInfo: user[0].info,
                role: user[0].role,
                docs: docs,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/ai', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id:id}, "info role")
            res.render('ai', {
                title: "FINFINE | AI",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/helper', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id:id}, "info role")
            res.render('helper', {
                title: "FINFINE | Helper",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/securitynotice', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role message")
            res.render('securitynotice', {
                title: "FINFINE | Security Notice",
                userInfo: user[0].info,
                role: user[0].role,
                settings: user[0].message
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/capitalallocation', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('capitalallocation', {
                title: "FINFINE | Capital Allocation",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/walletsettings', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id:id}, "info role")
            res.render('walletsettings', {
                title: "FINFINE | Wallet Settings",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/myprofile', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('myprofile', {
                title: "FINFINE | Profile",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/kyc', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            if(user[0].info.kyc === false){
                user[0].info.kyc_img.forEach(async (item)=>{
                    await db.user({id:id}, {$pull: {"info.kyc_img": item}})
                    const imgpPath = path.join(__dirname, `public/assets/avatars/${item}`)
                    await fsExtra.remove(imgpPath)
                })
                user[0].info.finance_fund.forEach(async (item)=>{
                    await db.user({id:id}, {$pull: {"info.finance_fund": {"balance": {$gte: 0}}}})
                })
                await db.user({id:id}, {$set: {"info.finance_total": 0}})
            }
            res.render('kyc', {
                title: "FINFINE | KYC",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })
    app.get('/2fa', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('2fa', {
                title: "FINFINE | 2FA",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/limitfees', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('limitfees', {
                title: "FINFINE | Limit And Fees",
                userInfo: user[0].info,
                role: user[0].role
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/delete', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            res.render('delete')
        } else {
            res.redirect('/login')
        }
    })

    app.get('/seeall', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            const countTrade = await countNoti(id, "trade")
            const countActivities = await countNoti(id, "activities")
            const countSystem = await countNoti(id, "system")
            const countAll = countTrade + countActivities + countSystem
            res.render('seeall', {
                title: "FINFINE | See All",
                userInfo: user[0].info,
                role: user[0].role,
                countAll: countAll,
                countTrade: countTrade,
                countSystem: countSystem,
                countActivities: countActivities
            })
        } else {
            res.redirect('/login')
        }
    })

    app.get('/logout', async (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/login')
        })
    })


    //home routes
    app.get('/', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/index', { 
                title: "FINFINE | Home ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/index', { 
                title: "FINFINE | Home ",
                userInfo: null
             })
        }
    })
    app.get('/about', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/company/about', { 
                title: "FINFINE | About Us ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/company/about', { 
                title: "FINFINE | About Us ",
                userInfo: null
             })
        }
    })
    app.get('/help', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/company/help', { 
                title: "FINFINE | Help Center",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/company/help', { 
                title: "FINFINE | Help Center",
                userInfo: null
             })
        }
    })
    app.get('/service', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/company/service', { 
                title: "FINFINE | Our Services  ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/company/service', { 
                title: "FINFINE | Our Services  ",
                userInfo: null
             })
        }
    })
    app.get('/team', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/company/team', { 
                title: "FINFINE | Our Team ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/company/team', { 
                title: "FINFINE | Our Team ",
                userInfo: null
             })
        }
    })

    //stock routes
    app.get('/stock', async (req, res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/stock/stock', { 
                title: "FINFINE | Stock ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/stock/stock', { 
                title: "FINFINE | Stock ",
                userInfo: null
             })
        }
    })

    //product routes
    app.get('/platform', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/product/platform', { 
                title: "FINFINE | FinFine Platform ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/product/platform', { 
                title: "FINFINE | FinFine Platform ",
                userInfo: null
             })
        }
    })
    app.get('/exchange', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/product/exchange', { 
                title: "FINFINE | Exchange ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/product/exchange', { 
                title: "FINFINE | Exchange ",
                userInfo: null
             })
        }
    })
    app.get('/bot', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/product/bot', { 
                title: "FINFINE | FinFineBot ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/product/bot', { 
                title: "FINFINE | FinFineBot ",
                userInfo: null
             })
        }
    })
    //fund routes
    app.get('/term', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/fund/term', { 
                title: "FINFINE | Terms And Conditions ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/fund/term', { 
                title: "FINFINE | Terms And Conditions ",
                userInfo: null
             })
        }
    })
    app.get('/invest-info', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/fund/invest', { 
                title: "FINFINE | Investment Information ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/fund/invest', { 
                title: "FINFINE | Investment Information ",
                userInfo: null
             })
        }
    })

    app.get('/partner', async (req,res)=>{
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            const user = await db.user({id: id}, "info role")
            res.render('home/fund/partner', { 
                title: "FINFINE | Partner ",
                userInfo: user[0].info,
                role: user[0].role
             })
        } else {
            res.render('home/fund/partner', { 
                title: "FINFINE | Partner ",
                userInfo: null
             })
        }
    })

    app.get('/test', async (req, res) => {
            const user = await db.user({id: 100003}, "info")
            res.render('test', {
                title: "DIGIGO | Tree",
                userInfo: user[0].info
            })
    })
}