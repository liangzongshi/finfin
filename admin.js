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
const price = require('./token')
const airdrop = require('./airdrop')
const group = require('./group')
const massage = require('./push')

function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0)
}
function xoa_dau(str){
    str = str.replace(/\s+/g, ' ');
   str = str.trim();
   str = str.toLowerCase();
   str = str.split(' ').join("-")
   return str;
}

module.exports = (app) => {

    app.get('/admin/setting', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const allUser = await db.user({}, "info")
                const settings = await db.admin({role:"admin"},"settings")
                res.render('admin/setting', {
                    title: "Finfine | Setting ",
                    userInfo: user[0].info,
                    AllUser: allUser,
                    role: user[0].role,
                    settings: settings[0].settings
                })
            }
        } else {
            res.redirect('/login')
        }
    })
    app.get('/admin/wallet', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                res.render('admin/wallet', {
                    title: "Finfine | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            }
        } else {
            res.redirect('/login')
        }
    })

    app.get('/admin/info/:page', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                var perPage = 100
                var page = req.params.page || 1
                var allUser = await db.User.find({}, "info role id").skip((perPage * page) - perPage).limit(perPage)
                var totalUser = (await db.user({}, "info role id")).length
                var totalInvestor = 0
                for(var i = 0; i < allUser.length; i ++){
                    var userInvest = await price.capitalTotal(allUser[i].id)
                    if(userInvest.FFT > 0){
                        totalInvestor += 1
                    }
                    allUser[i].userInvest = userInvest
                }
                const count = await db.User.countDocuments({})
                res.render('admin/info', {
                    title: "Finfine | Information ",
                    userInfo: user[0].info,
                    AllUser: allUser,
                    totalUser: totalUser,
                    totalInvestor: totalInvestor,
                    role: user[0].role,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            }
        } else {
            res.redirect('/login')
        }
    })
    app.get('/admin/group', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const allGroup = (await db.system({}, "groups"))[0].groups
                var allLeader = []
                allGroup.forEach(async (group)=>{
                    const leaderId = group.members[0]
                    const leader = (await db.user({id: leaderId}, 'info.first_name info.last_name info.email info.mobile info.job info.avatar'))[0].info
                    allLeader.push({
                        leader: leader,
                        groupID: group.code,
                        groupName: group.name
                    })
                })
                res.render('admin/group', {
                    title: "Finfine | Group ",
                    userInfo: user[0].info,
                    allGroup: allGroup,
                    allLeader: allLeader,
                    role: user[0].role
                })
            }
        } else {
            res.redirect('/login')
        }
    })
    app.get('/admin/event', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const events = await db.Event.find({}, "img title description eventId")
                events.forEach(async (event) => {
                    event.link = await xoa_dau(event.title)
                })
                res.render('admin/event', {
                    title: "Finfine | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role,
                    events:events
                })
            }
        } else {
            res.redirect('/login')
        }
    });
    app.get('/admin/finance', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const finance = await price.basicAdmin(timeskip = 0)
                const allUser = await db.user({}, "direct_commission static_interest dynamic_interest indirect_commission")
                const capital = (await price.trading(timeskip = 0)).capital
                var direct_commission = 0
                for(var i = 0; i < allUser.length; i++){
                    direct_commission += allUser[i].direct_commission
                }
                res.render('admin/finance', {
                    title: "Finfine | Finance ",
                    userInfo: user[0].info,
                    role: user[0].role,
                    direct_commission: direct_commission,
                    finance: finance,
                    capital: capital
                })
            }
        } else {
            res.redirect('/login')
        }
    });
    app.get('/admin/token', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const token = await price.trading(timeskip = 0)
                const allUser = await db.user({}, "info list_dad")
                var allFreeUser = 0
                for(var i = 0; i< allUser.length; i++) {
                    if((allUser[i].list_dad)[0] == null){
                        allFreeUser += 1
                    }
                }
                const airdropToken = (allUser.length - allFreeUser)*50
                res.render('admin/token', {
                    title: "Finfine | Token ",
                    userInfo: user[0].info,
                    role: user[0].role,
                    token: token,
                    airdropToken: airdropToken
                })
            }
        } else {
            res.redirect('/login')
        }
    });
    app.get('/admin/hft', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const allUser = await db.user({}, "direct_commission static_interest dynamic_interest indirect_commission")
                const totalProfit = (await db.system({},"profitDaily pay"))[0].profitDaily
                const totalPay = (await db.system({},"profitDaily pay"))[0].pay
                var direct_commission = 0
                var static_interest = 0
                var dynamic_interest = 0
                var indirect_commission = 0
                var depFund = 0
                for(var i = 0; i < allUser.length; i++){
                    direct_commission += allUser[i].direct_commission
                    static_interest += allUser[i].static_interest
                    dynamic_interest += allUser[i].dynamic_interest
                    indirect_commission += allUser[i].indirect_commission
                }
                for(var j = 0; j < totalProfit.length; j++){
                    depFund += (totalProfit[j].value - totalPay[j].value)*0.3
                }
                res.render('admin/hft', {
                    title: "Finfine | HFT ",
                    userInfo: user[0].info,
                    role: user[0].role,
                    direct_commission: direct_commission,
                    static_interest: static_interest,
                    dynamic_interest: dynamic_interest,
                    indirect_commission: indirect_commission,
                    depFund: depFund
                })
            }
        } else {
            res.redirect('/login')
        }
    });
    app.get('/admin/set-event', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                res.render('admin/set-event', {
                    title: "Finfine | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            }
        } else {
            res.redirect('/login')
        }
    });
}