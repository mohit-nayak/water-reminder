var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const axios = require("axios")

const PORT = 3000;
const TELEGRAM_TOKEN = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
const SERVER_URL = 'https://water-reminder-khaki.vercel.app';

// Telegram API Configuration
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const URI = `/webhook/${TELEGRAM_TOKEN}`
const webhookURL = `${SERVER_URL}${URI}`

// configuring the bot via Telegram API to use our route below as webhook
const setupWebhook = async () => {
    try {
        const { data } = await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true`)
        console.log(data)
    } catch (error) {
        return error
    }
}


// middlewares
app.use(express.json())

/*app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
) // for parsing application/x-www-form-urlencoded*/

//This is the route the API will call
app.post(URI, function(req, res) {
    const { message } = req.body

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || message.text.toLowerCase().indexOf("start") > -1) {
        // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response

        axios
            .post(
                "https://api.telegram.org/bot5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78/sendMessage",
                {
                    chat_id: message.chat.id,
                    text: `Polo!!! ${message.chat.id}`,
                }
            )
            .then((response) => {
                // We get here if the message was successfully posted
                console.log("Message posted for ", message.text);
                res.end("ok")
            })
            .catch((err) => {
                // ...and here if it was not
                // console.log("Error :", err)
                res.end("Error :" + err)
            });
    } else {
        res.end();
    }


    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
});

// Finally, start our server
app.listen(PORT, async function() {
    try {
        console.log(`Server is up and Running at PORT : ${PORT}`)
        await setupWebhook()
    } catch (error) {
        console.log(error.message)
    }
    console.log("Telegram app listening on port 3000!")
})