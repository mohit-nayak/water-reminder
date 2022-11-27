const telegramBot = require('node-telegram-bot-api');
const TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';

const bot = new telegramBot(TOKEN, { polling: true });

let interval;
let intervaHer;
let intervaHim;
let defaultTime = 15;

const herChatId = 1202318475;
const hisChatId = 5054842976;

const initHerWaterReminder = async () => {
    await bot.sendMessage(hisChatId, "She started water reminder!");
    const defaultTimeHer = 15;
    await bot.sendMessage(herChatId, `Next reminder in ${defaultTimeHer} minutes!`);
    const time = defaultTimeHer * 60000;
    interval = setInterval(async () => {
        await bot.sendMessage(herChatId, `Drink water. Stay hydrated! Next reminder in ${defaultTimeHer} minutes!`);
    }, time);
};

const initHisWaterReminder = async () => {
    await bot.sendMessage(hisChatId, "You started water reminder!");
    const defaultTimeHim = 20;
    await bot.sendMessage(hisChatId, `Next reminder in ${defaultTimeHim} minutes!`);
    const time = defaultTimeHim * 60000;
    interval = setInterval(async () => {
        await bot.sendMessage(hisChatId, `Drink water. Stay hydrated! Next reminder in ${defaultTimeHim} minutes!`);
    }, time);
};

initHerWaterReminder();
initHisWaterReminder();

/*bot.on('message', async (msg) => {
    const chatID = msg.from.id;
    const message = msg.text.toLowerCase();

    if (message.includes("start")) {
        const time = ((Number(message.split(" ")[1])) || defaultTime) * 60000;
        interval = setInterval(() => {
            bot.sendMessage(chatID, "Drink water. Stay hydrated!");
        }, time);
    }

    if (message.includes("stopher")) {
        clearInterval(intervaHer);
    } else if (message.includes("stophim")) {
        clearInterval(intervaHim);
    } else if (message.includes("stop")) {
        clearInterval(interval);
    }
});*/

bot.on('polling_error', (error) => {
    console.log("error ", error);
});

