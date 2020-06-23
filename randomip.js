const { sendMap,updateMap} = require("./map")
const rp = require("request-promise")
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
setInterval(()=>{
    updateMap2(`3.${getRandomInt(2,5)}.${getRandomInt(0,207)}.${getRandomInt(0,255)}`);//us
},16000)
setInterval(()=>{
    updateMap2(`8.${getRandomInt(128,191)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//cn
},17000)
setInterval(()=>{
    updateMap2(`8.${getRandomInt(210,223)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//sg
},18000)
setInterval(()=>{
    updateMap2(`220.${getRandomInt(64,103)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//kr
},19000)
setInterval(()=>{
    updateMap2(`14.${getRandomInt(160,191)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//vn
},20000)
setInterval(()=>{
    updateMap2(`3.${getRandomInt(12,23)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//us
},21000)
setInterval(()=>{
    updateMap2(`1.${getRandomInt(80,155)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//cn
},22000)
setInterval(()=>{
    updateMap2(`13.${getRandomInt(250,251)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//sg
},23000)
setInterval(()=>{
    updateMap2(`218.${getRandomInt(144,159)}.${getRandomInt(0,225)}.${getRandomInt(0,255)}`);//kr
},24000)
setInterval(()=>{
    updateMap2(`14.${getRandomInt(224,255)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//vn
},25000)
setInterval(()=>{
    updateMap2(`3.${getRandomInt(98,103)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//us
},26000)
setInterval(()=>{
    updateMap2(`27.${getRandomInt(8,31)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//cn
},27000)
setInterval(()=>{
    updateMap2(`18.${getRandomInt(138,143)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//sg
},28000)
setInterval(()=>{
    updateMap2(`221.${getRandomInt(138,168)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//kr
},29000)
setInterval(()=>{
    updateMap2(`3.${getRandomInt(128,247)}.${getRandomInt(0,15)}.${getRandomInt(0,255)}`);//us
},30000)
setInterval(()=>{
    updateMap2(`36.${getRandomInt(96,225)}.${getRandomInt(0,255)}.${getRandomInt(0,255)}`);//cn
},31000)
updateMap2 = async (data)=>{
  var uri = `https://geolocation-db.com/json/${data}`;
  rp({
      uri: uri,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true
  }, async (error,response,body)=>{
      if (!error && response.statusCode === 200) {
          await updateMap(body)
  }});
}
// updateMap2("220.81.143.9")
