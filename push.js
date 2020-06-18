const { getClient } = require('bottender')
const tlgClient = getClient('telegram')
const msgClient = getClient('messenger')

const send = async (platform, id, event_type, data) => {
    
}