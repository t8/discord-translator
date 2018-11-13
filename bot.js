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
    if (message.channel.id === "475725370587348992" || message.channel.id === "446075987680165890") {
        translate(message.content, 'ES')
            .then(res => {
                if (message.channel.id === "475725370587348992") {
                    message.reply(res.translation);
                    client.channels.get("446075987680165890").send("From " + message.author.username + ": " + res.translation);
                } else if (message.channel.id === "446075987680165890") {
                    message.reply(res.translation);
                    client.channels.get("475725370587348992").send("From " + message.author.username + ": " + res.translation);
                }
            })
            .catch(console.error);
    }
});

client.login(process.env.DISCORD_TOKEN);