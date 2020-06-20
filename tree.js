const DB = require('./db')
const db = new DB()
const later = require('later')
const R = require('ramda')

// later.setInterval(run, later.parse.text('every 5 mins'))

const mode = (level, dwFee, maxInvest, term, event, role) => {
    return {
        level: level,
        dwFee: dwFee,
        maxInvest: maxInvest,
        term: term,
        event: event,
        role: role,
    }
}

class PackageModel {
    constructor (brand, dynamic_interest, capital_required){

        // Tên gọi của gói
        this.brand = brand

        // Lãi suất động từ gói
        this.dynamic_interest = dynamic_interest /100

        // Lượng vốn yêu cầu
        this.capital_required = capital_required
    }
}

class LevelModel {
    constructor (static_receive, dynamic_receive){

        //Lãi tĩnh hệ thống
        this.static_receive = static_receive

        //Lãi động hệ thống
        this.dynamic_receive = dynamic_receive
    }
}

class Tree {
    package = (package_list) => {
        // Mảng danh sách gói
        this.package_list = package_list
    }

    level = (level_list, max_level) => {
        //Danh sách cấp
        this.level_list = level_list

        //Số tầng tối đa
        this.max_level = max_level
    }

    check_package = async (id) => {
        var doc = await db.user({id: id }, 'currency.balance currency.symbol')
        var balance = R.filter( n => n.symbol == 'FFT', doc[0].currency).pop().balance
        var system = (await db.system({}, 'totalFund totalToken'))[0]
        var price = system.totalFund / system.totalToken
        var us_balance = balance * price
        return {
            package: R.filter( n => n.capital_required <= us_balance, this.package_list).pop(),
            balance: balance,
            us_balance: us_balance
        }
    }

    add_node = async (id, referral, info) => {
        var list_dad = (await db.user({id: referral}, 'list_dad'))[0].list_dad
        list_dad.pop()
        list_dad.unshift(referral)

        await db.user({id: id}, {$set: {info: info, list_dad: list_dad}})
    }

    view_child = async (id) => {
        var detail = []
        for (var i = 0; i <= this.max_level; i++) {
            detail.push({
                balance: 0,
                total: 0,
                member: []
            }) 
        }
        var doc = await db.user({'list_dad': id},'id info list_dad currency.balance currency.symbol')
        var child = R.map(user => {
            var balance = R.filter( n => n.symbol == 'FFT', user.currency).pop().balance 

            detail[0].balance += balance
            detail[0].total += 1

            const index = user.list_dad.indexOf(id) + 1
            detail[index].balance += balance
            detail[index].total += 1
            detail[index].member.push({
                id: user.id,
                info: user.info
            })

            return {
                balance: balance,
                id: user.id,
                dad: user.list_dad[0],
                info: user.info
            }}, doc)
            
            var main = (await db.user({id: id}, 'info'))[0].info
            var org = [{
                id: "main",
                name: main.first_name + ' ' + main.last_name,
                post: (await this.check_package(id)).balance,
                phone: main.mobile,
                mail: main.email,
                photo: main.avatar,
                birthday: main.birthday,
                start: main.city
            }]

            child.forEach((us) => {
                org.push({
                    id: us.id,
                    name: us.info.first_name + ' ' + us.info.last_name,
                    post: us.balance,
                    phone: us.info.mobile,
                    mail: us.info.email,
                    photo: us.info.avatar,
                    birthday: us.info.birthday,
                    start: us.info.city
                })
            })
        return {
            detail: detail,
            diagram: child,
            org: org
        }
    }

    pay_swap_depo = async (idOraddr, value) => {
        var user
        if (idOraddr.length > 6){
            //Cai nay la deposit DGG
            user = await db.user({'currency.address': idOraddr, 'currency.symbol': 'FFT'}, 'list_dad')
        } else {
            user = await db.user({id: id, 'currency.symbol': 'FFT'}, 'list_dad')
        }
        const list_dad = user[0].list_dad
        const interest = this.level_list[0].static_receive

        list_dad.forEach( async (id, st) => {
            if (id !== null){
                var swap_dep_profit = interest[st] * value / 100
                await db.user({id: id, 'currency.symbol': 'FFT'}, {
                    $inc: {
                        'currency.$.balance': + swap_dep_profit, 
                        'currency.$.avai': + swap_dep_profit, 
                        'direct_commission': + swap_dep_profit
                    }, 
                    $push: {'received': {
                    type: 'direct_commission',
                    value: swap_dep_profit,
                }}})
            }
        })
    }

    pay_daily = async (block, pe, tmp) => {
        var rest = tmp
        var users = await db.user({'currency.symbol': 'FFT'}, 'id currency airdrop.static')
        var total = 0
        users.forEach( async (user, st) => {
            var balance = R.filter( n => n.symbol == 'FFT', user.currency).pop().balance
            var statics = (balance * user.airdrop.static / (30 * 100)).toFixed(0)
            await db.user({id: user.id, 'currency.symbol': 'FFT'}, {
                $inc: {
                    'currency.$.balance': + statics, 
                    'currency.$.avai': + statics, 
                    'static_interest': + statics
                }, 
                $push: {'received': {
                type: 'static_interest',
                value: statics,
            }}})

            total += statics
            if (st == users.length - 1){
                rest -= total
                var used = pe - rest
                if (block >= used / price){
                    await db.system({}, {
                        $inc: {
                            'totalFund': used + rest * 30 / 100, 
                            'totalToken': used / price,
                            'tokenBlock': - (used / price)
                        },
                        $push: {
                            pay: {
                                value: used
                            }
                        }
                    })
                } else {
                    await db.system({}, {
                        $inc: {
                            'totalFund': used + rest * 30 / 100, 
                            'totalToken': used / price,
                            'tokenBlock': 0
                        },
                        $push: {
                            pay: {
                                value: used
                            }
                        }
                    })
                }

                var forFund = rest * 70 / 100

                console.log(forFund)
            } 
        })
    }


    pay_order = async (pe) => {
        var rest = pe
        var doc = (await db.system({}, 'totalFund totalToken tokenBlock'))[0]
        var fund = doc.totalFund
        var token = doc.totalToken
        var block = doc.tokenBlock
        var price = fund / token
        var rateProfit = pe / token
        var users = await db.user({'currency.symbol': 'FFT'}, 'id list_dad')

        const interest = this.level_list[0].dynamic_receive

        users.forEach( async (user, st) => {
            var now_user = await this.check_package(user.id)
            var canDollar = rateProfit * now_user.balance
            var dollarReceive = rateProfit * now_user.package.dynamic_interest * now_user.balance

            var canProfit = canDollar / price
            var receivedProfit = dollarReceive / price
            var treeProfit = canProfit - receivedProfit

            rest = rest - dollarReceive

            await db.user({id: user.id, 'currency.symbol': 'FFT'}, {
                $inc: {
                    'currency.$.balance': + receivedProfit, 
                    'currency.$.avai': + receivedProfit, 
                    'dynamic_interest': + receivedProfit
                }, 
                $push: {'received': {
                type: 'dynamic_interest',
                value: receivedProfit,
            }}})

            user.list_dad.forEach( async ( dad, ts) => {
                if (dad !== null){
                    var treeOrder = interest[ts] * treeProfit / 100

                    rest = rest - (treeOrder * price)
                    await db.user({id: dad, 'currency.symbol': 'FFT'}, {
                        $inc: {
                            'currency.$.balance': + treeOrder, 
                            'currency.$.avai': + treeOrder, 
                            'indirect_commission': + treeOrder
                        }, 
                        $push: {'received': {
                        type: 'indirect_commission',
                        value: treeOrder,
                    }}})
                }
            })
        })

        this.pay_daily(block, pe, rest)
    }

    limit = async (id) => {
        const us = (await this.check_package(id)).us_balance
        const token = (await this.check_package(id)).balance
        const user = (await db.user({id: id}, 'info.kyc info.finance_total airdrop.complete airdrop.members'))[0]
        const kyc = user.info.kyc, com_airdrop = user.airdrop.complete, members = user.airdrop.members, fin = user.info.finance_total
    
        const maxi = fin * 25 / 100
        var regime = mode(1, 5, 5000, 360, false, 'starter')
    
        if (token >= 100000000){
            regime = mode(8, 0, Infinity, 30, true, 'shareholder')
            return regime
        }
    
        if (kyc){
            regime = mode(2, 2, maxi, 180, false, 'kyc')
            if (com_airdrop){
                regime = mode(3, 1, maxi, 150, false, 'user')
                if (us >= 5000){
                    regime = mode(4, 0, maxi, 120, false, 'user')
                    if (members >= 20){
                        regime = mode(5, 0, maxi, 90, true, 'user')
                        if (members >= 50){
                            regime = mode(6, 0, maxi, 60, true, 'leader')
                            if (( us >= 50000 ) && ( members >= 1000 ) ){
                                regime = mode(7, 0, Infinity, 30, true, 'senior leader')
                            }
                        }
                    }
                }
            }
        }
        return regime
    }

    upTime = async (id, cb, status) => {
        const history = (await db.user({id: id}, 'history'))[0].history
        var arr = []
        history.forEach( async (his, st) => {
            if ((his.symbol == 'FFT') && (his.expired == false) && ((his.type == 'deposit') || (his.type == 'swap') || ((his.type == 'switch') && (his.memo == child.id)))){
                const now = (Date.now() / 1000).toFixed(0)
                const past = (his.timestamp / 1000).toFixed(0)
                const a_time = now - past
                const term = (await this.limit(id)).term * 86400
                if ((a_time > term) && (status == 'all' || status == 'one')){

                    await db.user({id: id, 'history.timestamp': his.timestamp}, {
                        $set: {
                            'history.$.expired': true
                        }
                    })

                    await db.user({id, id, 'currency.symbol': 'FFT'}, {
                        $inc: {
                            'currency.$.avai': his.value
                        }
                    })
                } else {
                    if (status == 'all' || status == 'two'){
                        arr.push({
                            type: his.type,
                            value: his.value,
                            date: his.date,
                            hash: his.hash,
                            dasys: (( term - a_time ) / 86400).toFixed(0)
                        })
    
                        if (st == history.length -1){
                            cb(arr)
                        }
                    }
                }
            }
        })
    }
}

const pack_zero = new PackageModel('0 st', 0, 0)
const pack_one = new PackageModel('1 st', 35, 500)
const pack_two = new PackageModel('2 st', 40, 1000)
const pack_three = new PackageModel('3 st', 45, 5000)
const pack_four = new PackageModel('4 st', 50, 20000)
const pack_five = new PackageModel('5 st', 55, 50000)
const pack_six = new PackageModel('6 st', 60, 100000)

const package_list = [pack_zero, pack_one, pack_two, pack_three, pack_four, pack_five, pack_six]

const level_one = new LevelModel([5, 3, 2], [15, 10, 5])

const level_list = [level_one]

const tree = new Tree()
tree.package(package_list)
tree.level(level_list, 3)

module.exports = tree