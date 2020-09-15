require('dotenv').config();

module.exports = {
    debug: process.env.DEBUG === 'true' ? true : false,
    channel_id: process.env.CHANNEL_ID,
}