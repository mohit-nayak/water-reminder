const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

// const TelegramBot = require("node-telegram-bot-api");

const TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const SERVER_URL = 'https://water-reminder-khaki.vercel.app';

const URI = `/webhook/${TOKEN}`;
const webhookURL = `${SERVER_URL}${URI}`;

app.use(bodyParser.json())
/*app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)*/

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookURL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    return res.send()
})

app.listen(3000, async () => {
    console.log('🚀 app running on port', 3000)
    await init()
})

/*
const bot = new TelegramBot(TOKEN, {polling: true});
console.log("bot")

// bot.setWebHook(`${url}/bot${TELEGRAM_TOKEN}`);

// bot.sendMessage('5054842976', `Received your message from 5054842976`);


bot.on('message', (msg) => {
    console.log("started ", msg);
    console.log("started ", msg);
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `Received your message from ${chatId}`);
});
*/
