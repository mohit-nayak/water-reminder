const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `Received your message from ${chatId}`);
});
