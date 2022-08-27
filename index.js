var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post("/", function(req, res) {
    const { message } = req.body

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || message.text.toLowerCase().indexOf("marco") < 0) {
        // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
        return res.end()
    }

    let i = 0;
    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"


    const interval = setInterval(() => {
        
    }, 3000);
})

// Finally, start our server
app.listen(3000, function() {
    console.log("Telegram app listening on port 3000!")
})