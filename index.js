const telegramBot = require('node-telegram-bot-api');
const bodyParser = require("body-parser")
const express = require('express');
const cors = require('cors');

const TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const url = 'https://water-reminder-1.herokuapp.com';
const port = 3000;

// const bot = new telegramBot(TOKEN, { polling: true });
const bot = new telegramBot(TOKEN);

bot.setWebHook(`${url}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json())
/*
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
*/

cors({credentials: false, origin: false})

app.use(cors());

// We are receiving updates at the route below!
app.post('/', (req, res) => {
    console.log("Message received", req.body)
    bot.processUpdate(req.body);
    res.sendStatus(200).json({ message: 'ok' });
});


// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

let interval;
let defaultTime = 15;

bot.on('message', async (msg) => {
    const chatID = msg.from.id;
    const message = msg.text.toLowerCase();

    if (message.includes("start")) {
        let count = 0;
        const time = ((Number(message.split(" ")[1])) || defaultTime) * 60000;
        interval = setInterval(() => {
            count++;
            bot.sendMessage(chatID, "Drink water. Stay hydrated!");
        }, time);
    }

    if (message.includes("stop")) {
        clearInterval(interval);
    }
});

bot.on('polling_error', (error) => {
    console.log("error ", error);
});
