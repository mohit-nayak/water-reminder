const { TelegramBot } = require("telegram-bot-nodejs");

const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';

const bot = new TelegramBot(TELEGRAM_TOKEN, "5054842976");

async function main() {
    //The first argument is the matching text for the callback to be executed
    //The second argument is the callback function
    await bot.onMessage("Hi", async () => {
        await bot.sendMessage("Hello");
    });
}

main();