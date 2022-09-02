const { TelegramBot } = require("telegram-bot-nodejs");

const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';

const bot = new TelegramBot(TELEGRAM_TOKEN, "5054842976");

async function main() {
    await bot.onAnyMessage(async () => {
        await bot.sendMessage("Hello");
    });
}

main();