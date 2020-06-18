console.log(process.env.MODE)

// https://www.wikiwand.com/vi/Li%E1%BA%BFm_%C3%A2m_h%E1%BB%99

// const id = (actions, currencies) => {
//     var s = ''
//     currencies.forEach((currency) => {
//         actions.forEach((action) => {
//             s+= `#${action}-${currency}, `
//         })
//     })
//     return s
// }
// const ids = id(['deposit', 'withdraw', 'swap', 'send'], ['btc']).slice(0, -2)
// $(ids).click((e) => {
//     alert(e.target.id)
// })


        // axios.get('https://api.huobi.pro/market/depth?symbol=btcusdt&depth=5&type=step0')
      // .then(function (res) {
      //   const tick = res.data.tick
      //   const hbPriceSell = tick.asks[0][0]
      //   const hbAmountSell = tick.asks[0][1]
      //   const hbPriceBuy = tick.bids[0][0]
      //   const hbAmountBuy = tick.bids[0][1]
      //   if (hbPriceSell !== preHBsell && hbPriceBuy !== preHBbuy){
      //     preHBsell = hbPriceSell
      //     preHBbuy = hbPriceBuy

      //     if (bnbPriceSell < hbPriceBuy){
      //       console.log('Buy BNB Sell HB: ', (hbPriceBuy - bnbPriceSell).toFixed(2))
      //     }

      //     if (hbPriceSell < bnbPriceBuy){
      //       console.log('Buy HB Sell BNB: ',(bnbPriceBuy - hbPriceSell).toFixed(2))
      //     }
      //   }
      // })

      // whatsapp: {
      //   enabled: false,
      //   path: '/webhooks/whatsapp',
      //   accountSid: process.env.WHATSAPP_ACCOUNT_SID,
      //   authToken: process.env.WHATSAPP_AUTH_TOKEN,
      //   phoneNumber: process.env.WHATSAPP_PHONE_NUMBER,
      // },
      // line: {
      //   enabled: false,
      //   path: '/webhooks/line',
      //   accessToken: process.env.LINE_ACCESS_TOKEN,
      //   channelSecret: process.env.LINE_CHANNEL_SECRET,
      // },
      // slack: {
      //   enabled: false,
      //   path: '/webhooks/slack',
      //   accessToken: process.env.SLACK_ACCESS_TOKEN,
      //   signingSecret: process.env.SLACK_SIGNING_SECRET,
      // },
      // viber: {
      //   enabled: false,
      //   path: '/webhooks/viber',
      //   accessToken: process.env.VIBER_ACCESS_TOKEN,
      //   sender: {
      //     name: 'xxxx',
      //   },
      // },
