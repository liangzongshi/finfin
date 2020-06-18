require('dotenv').config()
const axios = require('axios')
const DB = require('./db')
const db = new DB()

const Redis = require("ioredis")
const redis = new Redis()

const later = require('later')
const tree = require('./tree')
const price = require('./token')
const airdrop = require('./airdrop')

const Binance = require('binance-api-node').default
const bnb = new Binance()

const Coinbase = require('coinbase-pro')
const cb = new Coinbase.PublicClient()

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

const coins = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'EOS', 'DASH', 'XLM', 'ETC', 'ATOM', 'XTZ', 'OMG', 'LINK', 'ZRX', 'ALGO']

const order = async (symbol, min, max) => {
  var preBNBsell = 0, preBNBbuy = 0, preHBsell = 0, preHBbuy = 0, preCBsell = 0, preCBbuy = 0

  bnb.ws.partialDepth({ symbol: `${symbol}USDT`, level: 5 }, async (depth) => {
    const bnbPriceSell = Number(depth.asks[0].price).toFixed(6)
    const bnbAmountSell = Number(depth.asks[0].quantity)
    const bnbPriceBuy = Number(depth.bids[0].price).toFixed(6)

    if (bnbPriceSell !== preBNBsell && bnbPriceBuy !== preBNBbuy){
      preBNBsell = bnbPriceSell
      preBNBbuy = bnbPriceBuy

      cb.getProductOrderBook(`${symbol}-USD`, { level: 1 }, async (err, data) => {
        if (data !== undefined){
          const res = JSON.parse(data.body)
          const cbPriceSell = Number(res.asks[0][0]).toFixed(6)
          const cbAmountSell = Number(res.asks[0][1])
          const cbPriceBuy = Number(res.bids[0][0]).toFixed(6)

          if (cbPriceSell !== preCBsell && cbPriceBuy !== preCBbuy){
            preCBsell = cbPriceSell
            preCBbuy = cbPriceBuy

            var _cb = (cbPriceBuy - bnbPriceSell) - (bnbPriceSell * 0.00024 + cbPriceBuy * 0.0004)
            if ( _cb  > 0){
              const rel = (100 - between(min, max)) / 100
              const profit = bnbAmountSell * rel * _cb
              console.log(`${symbol} B/C: `, profit.toFixed(4))
              await redis.incrbyfloat('profitDay', profit.toFixed(4))
              await db.system({}, {
                $inc: {
                  'totalOrder': 1, 
                  // 'totalFund': profit.toFixed(4),
                  'totalProfit': profit.toFixed(4)
                },
                $push: {
                  orders: {
                    type: symbol,
                    amount: (bnbAmountSell * rel).toFixed(6),
                    buy: {
                      exchanger: 'Binance',
                      price: bnbPriceSell
                    },
                    sell: {
                      exchanger: 'Coinbase',
                      price: cbPriceBuy
                    },
                    profit: profit.toFixed(4)                     
                  }
                }
              })
              await price.writeLog()
            }
  
            var _bnb = (bnbPriceBuy - cbPriceSell) - (bnbPriceBuy * 0.00024 + cbPriceSell * 0.0004)
            if (_bnb > 0){
              const rel = (100 - between(min, max)) / 100
              const profit = cbAmountSell * rel * _bnb
              console.log(`${symbol} C/B: `, profit.toFixed(4))
              await redis.incrbyfloat('profitDay', profit.toFixed(4))
              await db.system({}, {
                $inc: {
                  'totalOrder': 1, 
                  // 'totalFund': profit.toFixed(4),
                  'totalProfit': profit.toFixed(4)
                },
                $push: {
                  orders: {
                    type: symbol,
                    amount: (cbAmountSell * rel).toFixed(6),
                    buy: {
                      exchanger: 'Coinbase',
                      price: cbPriceSell
                    },
                    sell: {
                      exchanger: 'Binance',
                      price: bnbPriceBuy
                    },
                    profit: profit.toFixed(4)                     
                  }
                }
              })
              await price.writeLog()
            }
          }
        }
      })
    } 
  })
}

// coins.forEach( coin => order(coin, 1, 40) )

const accDay = async () => {
  const pe = await redis.get('profitDay')
  await redis.set('profitDay', 0)
  await db.system({}, {
    $push: {
      profitDaily: {
        value: pe
      }
    }
  })

  await tree.pay_order(pe)
  const ids = await db.user({}, 'id')
  ids.forEach( async (id) => {
    tree.upTime(id, cd, 'one')
  })

  await airdrop.checkAirInvest()
}

// later.setInterval(accDay, later.parse.text('every 1 day'))
