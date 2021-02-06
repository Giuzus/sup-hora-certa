
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


let DiscordBot = require("./discord-bot.js");

let bot = new DiscordBot();




bot.connect().then(client => {
    console.log("Pog");
    
    bot.play("audio/Hora_Certa_10_e_poco.mp3");
});

