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
            // if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const allUser = await db.user({}, "info")
                const settings = await db.admin({role:"admin"},"settings")
                res.render('admin/setting', {
                    title: "FINFINE | Setting ",
                    userInfo: user[0].info,
                    AllUser: allUser,
                    role: user[0].role,
                    settings: settings[0].settings
                })
            // }
        } else {
            res.redirect('/login')
        }
    })
    app.get('/admin/wallet', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            // if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                res.render('admin/wallet', {
                    title: "FINFINE | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            // }
        } else {
            res.redirect('/login')
        }
    })

    app.get('/admin/info/:page', async (req, res) => {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            // if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                var perPage = 50
                var page = req.params.page || 1
                const allUser = await db.User.find({}, "info role").skip((perPage * page) - perPage).limit(perPage)
                const count = await db.User.countDocuments({})
                res.render('admin/info', {
                    title: "FINFINE | Information ",
                    userInfo: user[0].info,
                    AllUser: allUser,
                    role: user[0].role,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            // }
        } else {
            res.redirect('/login')
        }
    })
    app.get('/admin/event', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            // if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                const events = await db.Event.find({}, "img title description eventId")
                events.forEach(async (event) => {
                    event.link = await xoa_dau(event.title)
                })
                res.render('admin/event', {
                    title: "FINFINE | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role,
                    events:events
                })
            // }
        } else {
            res.redirect('/login')
        }
    });
    app.get('/admin/set-event', async (req, res)=> {
        if ( !!getId(req,'') ){
            const id = decId(getId(req,''))
            // if(id == 100000 || id == 100002 ){
                const user = await db.user({id: id}, "info role")
                res.render('admin/set-event', {
                    title: "FINFINE | Wallet ",
                    userInfo: user[0].info,
                    role: user[0].role
                })
            // }
        } else {
            res.redirect('/login')
        }
    });
}