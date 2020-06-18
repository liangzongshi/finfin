const DB = require('./db')
const db = new DB()

class Fund {
    constructor(name, balance, scale){
        this.name = name
        this.balance = balance
        this.scale = scale
    }

    create = async (id, name, balance, scale)=> {
        const fin = {
            name: name,
            balance: balance,
            scale: scale
        }
        await db.user({id: id},{$push: {"info.finance_fund": fin}})
    }
    add_scale = async (id, name, balance, scale)=>{
        await db.user({id:id, "info.finance_fund.name": name}, {$inc: {"info.finance_fund.$.balance": + balance*scale}})
    }
    add_no_scale = async (id, name, balance)=>{
        await db.user({id:id, "info.finance_fund.name": name}, {$inc: {"info.finance_fund.$.balance": + balance}})
    }
}

const fund = new Fund()

create_fund = async (id)=>{
    await fund.create(id , "SUMP", 0, 0.5 )
    await fund.create(id , "EDU", 0, 0.1 )
    await fund.create(id , "INV", 0, 0.2 )
    await fund.create(id , "PLAY", 0, 0.1 )
    await fund.create(id , "SAVE", 0, 0.1 )
    await fund.create(id , "LOAN", 0, 0 )
    await fund.create(id , "DEBT", 0, 0 )
}

add_scale = async (id, balance)=>{
    await fund.add_scale(id, "SUMP", balance, 0.5)
    await fund.add_scale(id, "EDU", balance, 0.1)
    await fund.add_scale(id, "INV", balance, 0.2)
    await fund.add_scale(id, "PLAY", balance, 0.1)
    await fund.add_scale(id, "SAVE", balance, 0.1)
    await fund.add_scale(id, "LOAN", balance, 0)
    await fund.add_scale(id, "DEBT", balance, 0)
}
del_scale = async (id, balance)=>{
    add_scale(id, balance*(-1))
}

add_no_scale = async (id, name, balance)=>{
    await fund.add_no_scale(id, name, balance)
}

del_no_scale = async (id, name, balance)=> {
    await fund.add_no_scale(id, name, balance*(-1))
}

update_scale = async (id, oldValue, newValue )=> {
    await del_scale(id, oldValue)
    await add_scale(id, newValue)
}

update_no_scale = async (id, name, oldValue, newValue)=>{
    await del_no_scale(id, name, oldValue)
    await add_no_scale(id, name, newValue)
}



module.exports = {
    create_fund,
    add_scale,
    add_no_scale,
    del_scale,
    del_no_scale,
    update_scale,
    update_no_scale
}