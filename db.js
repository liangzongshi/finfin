const mongoose = require('mongoose')
const Schema = mongoose.Schema

if (process.env.MODE == 'dev'){
    mongoose.connect('mongodb://localhost/digigo',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}
if (process.env.MODE == 'prod'){
    mongoose.connect('mongodb://admin:digigomongo@localhost/digigo',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

const schemaUser = new Schema({
    role: {type: String, default: 'user'},
    // Thông tin cá nhân
    info: {
        first_name: {type: String, default: null},
        last_name: {type: String, default: null},
        email: {type: String, default: null},
        hash_password: {type: String, default: null},
        kyc: {type: Boolean, default: false},
        ggauth: {type: Boolean, default: false},
        kyc_img: [{ type: String,default: null }],
        job: {type: String, default: null},
        mobile: {type: String, default: null},
        village: {type: String, default: null},
        district: {type: String, default: null},
        about: {type: String, default: null},
        country: {type: String, default: null},
        country_code: {type: String, default: null},
        city: {type: String, default: null},
        gender: {type: String, default: "male"},
        birthday: {type: Date, default: Date.now},
        avatar: {type: String, default: null},
        status_upload: {type:String, default: ""},
        finance_total: {type: Number, default: 0 },
        finance_fund: [{
            name: {type: String, default: null},
            balance: {type: Number, default: 0},
            scale: {type: Number, default: 0}
        }],
        finance_history: [{
            hisId: {type: String, default: null},
            type: {type: String, default: null},
            title: {type:String, default: null},
            value: {type:Number, default: 0},
            date: {type: Date, default: Date.now}
        }],
        helper_array:[{
            helperId: {type:String, default: null},
            sub: {type:String, default: null},
            details: {type:String, default: null},
            status_handle: {type: Boolean, default: false}
        }],
        notification: [{
            notiId: {type:String, default: null},
            sub: {type:String, default: null},
            type: {type:String, default: null},
            content: {type:String, default: null},
            status: {type: Boolean, default: false},
            times: {type: Date, default: Date.now}
        }],
        joined: {type: String, default: null}
    },
    // Bảo mật
    secure: {
        google: {type: String, default: null},
    },
    // 2FA
    authen: {
        login: {type: Boolean, default: false},
        withdrawn: {type: Boolean, default: false},
        select: {type: String, default: null}, 
    },
    // Hệ thống thông báo
    message: {
        phone: {
            status: { type: Boolean, default: false},
            id: {type: String, default: null},
        },
        messenger: {
            status: { type: Boolean, default: false},
            id: {type: String, default: null},
        },
        telegram: {
            status: { type: Boolean, default: false},
            id: {type: String, default: null},
        },
        website: {
            status: { type: Boolean, default: false},
            id: {type: String, default: false},
        }
    },
    // Hệ thống cây
    id: {type: String, default: null},
    list_dad: [{type: String, default: null}],
    
    //Airdrop
    airdrop: {
        // invest: {type: Boolean, default: false},
        messenger: {type: Boolean, default: false},
        telegram: {type: Boolean, default: false},
        youtube: {type: Boolean, default: false},
        complete: {type: Boolean, default: false},
        members: {type: Number, default: 0}, //Co dau tu
        static: {type: Number, default: 0},
    },

    //Invest
    received: [{
        type: {type: String, default: null},
        value: {type: Number, default: 0},
        timestamp: {type: Date, default: Date.now}
    }],
    direct_commission: {type: Number, default: 0},
    static_interest: {type: Number, default: 0},
    dynamic_interest: {type: Number, default: 0},
    indirect_commission: {type: Number, default: 0},

    // Ví
    index: {type: Number, default: null},
    currency: [{
        symbol: {type: String, default: null},
        coin: {type: String, default: null},
        logo: {type: String, default: null},
        address: {type: String, default: null},
        balance: {type: Number, default: 0},
        avai: {type: Number, default: 0},
        memo: {type: String, default: null},
        to_swap: [{
            symbol: {type: String, default: null},
            coin: {type: String, default: null},
        }]
    }],
    history: [{
        type: {type: String, default: null},
        symbol: {type: String, default: null},
        hash: {type: String, default: null},
        address: {type: String, default: null},
        value: {type: Number, default: null},
        price: {type: Number, default: null},
        memo: {type: String, default: null}, 
        expired: {type: Boolean, default: false},
        date: {type: Date , default: Date.now()},
        timestamp: {type: Date , default: Date.now}
    }],
    bonus: [{
        value: {type: Number, default: null},
        symbol: {type: String, default: null},
        type: {type: String, default: null},
        timestamp: {type: Date, default: Date.now}
    }]
},{
    versionKey: false
})

const User = mongoose.model('User', schemaUser,'users')

const schemaAdmin = new Schema({
    //Tong cac loai Tien vao ra
    totalFlow: [{
        symbol: {type: String, default: null},
        value: {type: Number, default: 0},
        timestamp: {type: Date, default: Date.now}
    }],
    //Danh sach thong tin ve Bonus theo thang
    events: [{
        invester: {
            received: [{
                who: {type: String, default: null},
                value: {type: Number, default: null},
                symbol: {type: String, default: null}
            }],
            top: {type: Number, default: null},
            unit: {type: String, default: null}, //Coin, Lai Thang du
            value: {type: Number, default: null},
        },
        saler: {
            received: [{
                who: {type: String, default: null},
                value: {type: Number, default: null}
            }],
            top: {type: Number, default: null},
            unit: {type: String, default: null}, //Coin, Lai Thang du
            value: {type: Number, default: null},
        },
        group: {
            received: [{
                who: {type: String, default: null},
                value: {type: Number, default: null}
            }],
            top: {type: Number, default: null},
            leader: {type: Number, default: null},
            unit: {type: String, default: null}, //Coin, Lai Thang du
            value: {type: Number, default: null},
        },
        timestamp: {type: Date, default: Date.now},
        totalBonus: {type: Number, default: null}
    }],
    role: {type: String, default: 'admin'},
    nowId: {type: Number, default: null},
    settings: {
        deposit: {
            btc:{type: Boolean, default: true},
            eth:{type: Boolean, default: true},
            bnb:{type: Boolean, default: true},
            usdt:{type: Boolean, default: true},
            fft:{type: Boolean, default: true},
        },
        withdraw: {
            btc:{type: Boolean, default: true},
            eth:{type: Boolean, default: true},
            bnb:{type: Boolean, default: true},
            usdt:{type: Boolean, default: true},
            fft:{type: Boolean, default: true},
        },
        login: {type: Boolean, default: true},
        register: {type: Boolean, default: true},
        swap: {type: Boolean, default: true},
        hft: {type: Boolean, default: true},
        airdrop: {type: Boolean, default: true},
        web: {type: Boolean, default: true},
        dashboard: {type: Boolean, default: true},
        delete: {type: Boolean, default: true}
    },
    wallet: {
        t: {type: String, default: null},
        m: {type: String, default: null},
        l: {type: String, default: null}
    }
},{
    versionKey: false
})

const Admin = mongoose.model('Admin', schemaAdmin,'admins')

const schemaSystem = new Schema({
    totalFund: {type: Number, default: 14285700},
    totalToken: {type: Number, default: 142857000},
    tokenBlock: {type: Number, default: 0},
    totalOrder: {type: Number, default: 0},
    totalProfit: {type: Number, default: 0},
    orders: [{
        timestamp: {type: Date, default: Date.now},
        type: {type: String, default: null},
        amount: {type: Number, default: null},
        buy: {
            exchanger: {type: String, default: null},
            price: {type: Number, default: null},
        },
        sell: {
            exchanger: {type: String, default: null},
            price: {type: Number, default: null},
        },
        profit: {type: Number, default: null}
    }],
    profitDaily: [{
        value: {type: Number, default: null},
        timestamp: {type: Date, default: Date.now},
    }],
    groups: [{
        code: {type:String, default: null}, 
        avt: {type: String, default: null},
        chat: {type: String, default: null},
        meeting: {type: String, default: null},
        offline: {type: String, default: null},
        time: {type: String, default: null},
        name: {type: String, default: null},
        local: {type: String, default: null},
        members: [{type: Number, default: null}]
    }],
    pay: [{
        value: {type: Number, default: null},
        timestamp: {type: Date, default: Date.now}
    }]
},{
    versionKey: false
})

const System = mongoose.model('System', schemaSystem,'systems')

const schemaPaper = new Schema({
    newsId: {type: String, default: null},
    sub: {type: String, default: null},
    content1: {type: String, default: null},
    content2: {type: String, default: null},
    content3: {type: String, default: null},
    content4: {type: String, default: null},
    description: {type: String, default: null},
    img: {type: String, default: null},
    writer: {type: String, default: null},
    timestamp: {type: Date, default: Date.now}
})
const schemaDoc = new Schema({
    docId: {type: String, default: null},
    typeDoc: {type: String, default: null},
    sub: {type: String, default: null},
    link: {type: String, default: null}
})
const schemaEvent = new Schema({
    eventId: {type: String, default: null},
    title: {type: String, default: null},
    description: {type: String, default: null},
    content1: {type: String, default: null},
    content2: {type: String, default: null},
    content3: {type: String, default: null},
    content4: {type: String, default: null},
    img: {type: String, default: null},
    timestamp: {type: Date, default: Date.now},
})
const schemaMap = new Schema({
    country: {type: String, default: null},
    alpha2: {type: String, default: null},
    location:[{
        latitude: {type: Number, default: null},
        longitude: {type: Number, default: null},
    }],
    total: {type: Number, default: null},
})

const Paper = mongoose.model('Paper', schemaPaper,'papers')
const Doc = mongoose.model('Doc', schemaDoc,'docs')
const Map = mongoose.model('Map', schemaMap,'maps')
const Event = mongoose.model('Event', schemaEvent,'events')

class DB{
    constructor(){
        this.User = User
        this.Admin = Admin
        this.System = System

        this.Paper = Paper
        this.Doc = Doc
        this.Map = Map
        this.Event = Event
    }
    user = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.User.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.User.find(filter)
            } else {
                return await this.User.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.User(filter)
            return await doc.save()
        }
    }

    admin = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.Admin.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.Admin.find(filter)
            } else {
                return await this.Admin.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.Admin(filter)
            return await doc.save()
        }
    }

    system = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.System.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.System.find(filter)
            } else {
                return await this.System.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.System(filter)
            return await doc.save()
        }
    }

    paper = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.Paper.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.Paper.find(filter)
            } else {
                return await this.Paper.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.Paper(filter)
            return await doc.save()
        }
    }

    map = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.Map.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.Map.find(filter)
            } else {
                return await this.Map.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.Map(filter)
            return await doc.save()
        }
    }
    event = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.Event.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.Event.find(filter)
            } else {
                return await this.Event.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.Event(filter)
            return await doc.save()
        }
    }
    doc = async (filter,  updater) =>{
        if (typeof updater === 'object'){
            return await this.Doc.findOneAndUpdate(filter,updater,{new:true})
        }
        if (typeof updater === 'string'){
            if (updater === ''){
                return await this.Doc.find(filter)
            } else {
                return await this.Doc.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined'){
            const doc = new this.Doc(filter)
            return await doc.save()
        }
    }
}

module.exports = DB