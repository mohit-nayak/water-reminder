const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const url = 'https://api.telegram.org';

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});
console.log("bot")

bot.setWebHook(`${url}/bot${TELEGRAM_TOKEN}`);

// bot.sendMessage('5054842976', `Received your message from 5054842976`);


bot.on('message', (msg) => {
    console.log("started ", msg);
    console.log("started ", msg);
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `Received your message from ${chatId}`);
});
