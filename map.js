const rp = require('request-promise');
const DB = require('./db')
const db = new DB()

sendMap = async (socket)=>{
    var data = await db.map({}, "country location total")
    var dataInfo = data.sort((a,b)=> b.total - a.total)
    var dataMap = []
    data.forEach(async (item)=>{
        var name = item.country
        item.location.forEach(async (location)=>{
            var local_user = {latLng: [location.latitude, location.longitude], name: name}
            dataMap.push(local_user)
        })
    })
    await socket.emit("create_map", {dataMap: dataMap, dataInfo:dataInfo})
}
function randomInt(min, max) { // min and max included 
    return (Math.random() * (max - min + 1) + min);
  }
updateMap = async (data)=>{
    rp({
        uri: `https://api.ipgeolocationapi.com/countries/${data.country_code}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true 
    }, async (err, res, body)=>{
        const country = await db.map({alpha2: body.alpha2}, "total")
        if(country.length == 0){
            const new_local = {
                "country": body.name,
                "alpha2": body.alpha2,
                "location":[{
                    "latitude": data.latitude,
                    "longitude": data.longitude,
                }],
                "total": 1,
            }
            await db.map(new_local)
        }else{
            await db.map({"alpha2": body.alpha2},{$push: {location: {
                "latitude": data.latitude,
                "longitude": data.longitude,
            }}})
            await db.map({"alpha2": body.alpha2},{$inc: {total: 1}})
        }
    })
    return;
}

module.exports = {
    sendMap,
    updateMap
}