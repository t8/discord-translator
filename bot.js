const Discord = require("discord.js");
const client = new Discord.Client();
const { translate, detectLanguage, wordAlternatives, translateWithAlternatives } = require('deepl-translator');
require('dotenv').config();

client.on("ready", () => {
    // Hardcoded accepted channels for the bot to translate in.
    // You're going to want to change this when you clone the repo
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Translating for ${client.users.size} people!`);
});

client.on("message", async message => {
    if(message.author.bot) {
        return;
    }
    //                          Spanish channel ID                             English channel ID
    if (message.channel.id === "478677568724271108" || message.channel.id === "446075987680165890") {
        let translatedText = "";
        let detectedLanguage = "";
        translate(message.content, 'ES')
            .then(res => translatedText = res.translation)
            .catch(console.error);
        detectLanguage(message.content)
            .then(res => detectedLanguage = res.languageName)
            .catch(console.error);
        postToChannel(detectedLanguage, translatedText);
    }
});

function postToChannel(detectedLang, tMsg) {
    let toType = "undef";
    if (detectedLang === "ES") {
        // Language is english, so translate and post to spanish
        toType = "en";
        client.channels.get("478677568724271108").send(tMsg);
    } else if (detectedLang === "EN") {
        // Language is spanish, so translate and post to english
        toType = "es";
        client.channels.get("478677568724271108").send(tMsg);
    }
}

client.login(process.env.DISCORD_TOKEN);