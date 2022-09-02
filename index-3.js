var TelegramBot = require('node-telegram-bot-api');

var token = '5743867232:AAEqMVYKx3WHXfrKLsrtEoid_sY9mEwcg78';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
    var chatId = msg.chat.id;
    // photo can be: a file path, a stream or a Telegram file_id
    var photo = 'cats.png';
    bot.sendMessage(msg.chat.id, "Hello mohit");
    // bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});

app.listen(3000, function() {
    console.log("Telegram app listening on port 3000!")
})