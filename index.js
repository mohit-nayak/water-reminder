const TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const url = `https://water-reminder-khaki.vercel.app/bot${TOKEN}`;
const port = 3000;

const TelegramBot = require('node-telegram-bot-api');
// const express = require('express');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN, {polling: true});

// This informs the Telegram servers of the new webhook.
bot.setWebHook(url);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(url, (req, res) => {
    console.log("requested")
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'I am alive!');
});

/*
let interval;
let defaultTime = 15;

bot.on('message', (msg) => {
    const chatID = msg.from.id;
    const message = msg.text.toLowerCase();

    if (message.includes("start")) {
        const time = ((Number(message.split(" ")[1])) || defaultTime) * 60000;
        console.log("starting for time ", time);
        interval = setInterval(() => {
            bot.sendMessage(chatID, "Drink water!");
        }, time);
    }

    if (message === "stop") {
        clearInterval(interval);
    }
})*/
