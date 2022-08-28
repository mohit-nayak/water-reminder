var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const axios = require("axios")
var cors = require('cors');

const PORT = 3000;
const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const SERVER_URL = 'https://water-reminder-khaki.vercel.app';

// Telegram API Configuration
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const URI = `/webhook/${TELEGRAM_TOKEN}`
const webhookURL = `${SERVER_URL}${URI}`


app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
) // for parsing application/x-www-form-urlencoded

cors({credentials: false, origin: false})

app.use(cors());

var timer;

//This is the route the API will call
app.post("/", function(req, res) {
    // console.log("req", req)
    const { message, chatFromClient } = req.body
    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (message && !chatFromClient) {
        let chatID = message.chat.id;
        let text = 'Hello there!';
        if (message.text.toLowerCase().indexOf("chat_id") > -1) {
            text = `${message.chat.id} is your chat id`
        }

        sendMessage(res, chatID, text);
    }
    else if (chatFromClient) {
        console.log("chat from client for ", chatFromClient);
        let chatID = chatFromClient;
        let text = `Water reminder. Stay hydrated!`;

        sendMessage(res, chatID, text);
    }
    else {
        res.end();
    }

    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
});

const sendMessage = (res, chatID, text) => {
    console.log("Sending msg...")
    res.end();
    timer = setInterval(() => {
        axios
            .post(
                "https://api.telegram.org/bot5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78/sendMessage",
                {
                    chat_id: chatID,
                    text,
                }
            )
            .then((response) => {
                // We get here if the message was successfully posted
                console.log("Message posted for ", text);
                res.end("Request successful")
            })
            .catch((err) => {
                // ...and here if it was not
                // console.log("Error :", err)
                res.end("Error :" + err)
            });
    }, 15000);
};

// Finally, start our server
app.listen(PORT, async function() {
    console.log("Telegram app listening on port 3000!")
})
