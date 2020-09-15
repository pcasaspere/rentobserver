const TelegramBot = require('node-telegram-bot-api');
const CONFIG = require('../config/telegram');

const bot = new TelegramBot(CONFIG.token, {polling: true});

module.exports = class Telegram {

    constructor() {
        this.chat_id = CONFIG.channel_id;
    }

    send(text) {
        return bot.sendMessage(this.chat_id, text);
    }

}