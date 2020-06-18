const DB = require('./db')
const db = new DB()

class Noti {
    constructor(notiId, sub, type, content, status, times){
        this.notiId = notiId
        this.sub = sub
        this.type = type
        this.content = content
        this.status = status
        this.times = times
    }

    createNoti = async (id, data)=>{
        await db.user({id:id}, {$push: {"info.notification": data}})
    }

    count = async (id, type)=>{
        const user = await db.user({id:id}, "info")
        const countType = user[0].info.notification.filter(n => n.type == type).length
        return countType
    }
}

const noti = new Noti()

createNoti = async (id,data)=>{
    await noti.createNoti(id,data)
}

countNoti = async (id, type)=>{
    return await noti.count(id, type)
}

module.exports = {
    createNoti,
    countNoti
}