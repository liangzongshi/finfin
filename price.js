// this is where you paste your api key
var apiKey = "iR4ZVv95G1XHHd31prSnM6huk44I8ONRQ4vgpHAvyCS7vjHmMmTuzqGEuIjiIdwB";
const api = require('binance');
const binanceWS = new api.BinanceWS(true);

module.exports =  getCoinInfo = (coin, socket)=>{
    binanceWS.onKline(`${coin}USDT`, '1m', data => {
        socket.emit(`${coin}_info`, data)
    });
}


