$(document).ready(() => {
    const socket = io()
    function addCommas(nStr){
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    socket.on("BTC_info", data =>{
        $("#btc_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#btc_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#btc_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#btc_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#btc_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#btc_top_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#btc_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#btc_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#btc_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("ETH_info", data =>{
        $("#eth_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#eth_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#eth_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#eth_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#eth_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#eth_top_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#eth_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#eth_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#eth_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("BNB_info", data =>{
        $("#bnb_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#bnb_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#bnb_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#bnb_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#bnb_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#bnb_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#bnb_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#bnb_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("BCH_info", data =>{
        $("#bch_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#bch_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#bch_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#bch_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#bch_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#bch_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#bch_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#bch_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("EOS_info", data =>{
        $("#eos_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#eos_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#eos_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#eos_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#eos_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#eos_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#eos_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#eos_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("XRP_info", data =>{
        $("#xrp_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#xrp_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#xrp_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#xrp_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#xrp_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#xrp_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#xrp_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#xrp_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("LTC_info", data =>{
        $("#ltc_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#ltc_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#ltc_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#ltc_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#ltc_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#ltc_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#ltc_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#ltc_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("DASH_info", data =>{
        $("#dash_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#dash_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#dash_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#dash_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#dash_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#dash_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#dash_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#dash_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("LINK_info", data =>{
        $("#link_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#link_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#link_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#link_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        
    })
    socket.on("XTZ_info", data =>{
        $("#xtz_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#xtz_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#xtz_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#xtz_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        
    })
    socket.on("ZEC_info", data =>{
        $("#zec_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#zec_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#zec_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#zec_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#zec_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#zec_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#zec_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#zec_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
    socket.on("ETC_info", data =>{
        $("#etc_info_price").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#etc_info_high").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#etc_info_low").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#etc_info_volume").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
        $("#etc_price_home").html(addCommas(parseInt(data.kline.open).toFixed(2)))
        $("#etc_high_home").html(addCommas(parseInt(data.kline.high).toFixed(2)))
        $("#etc_low_home").html(addCommas(parseInt(data.kline.low).toFixed(2)))
        $("#etc_volume_home").html(addCommas(parseInt(data.kline.quoteVolume).toFixed(2)))
    })
})