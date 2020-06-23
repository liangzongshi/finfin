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

updateMap = async (data)=>{
    
    console.log(data);
    const country = (await db.map({"alpha2": data.country_code}, "country location total")).length
    if(country == 0){
        const new_local = {
            "country": data.country_name,
            "alpha2": data.country_code,
            "location":[{
                "latitude": data.latitude,
                "longitude": data.longitude,
            }],
            "total": 1
        }
        await db.map(new_local)
    }else{
        await db.map({"alpha2": data.country_code},{$push: {location: {
            "latitude": data.latitude,
            "longitude": data.longitude,
        }}})
        await db.map({"alpha2": data.country_code},{$inc: {total: 1}})
    }
}


module.exports = {
    sendMap,
    updateMap
}