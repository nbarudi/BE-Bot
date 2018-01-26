const botSettings = require("./botsettings.json")
const Discord = require("discord.js")
const fs = require("fs")
//const request = require("request")
const ytdl = require("ytdl-core")
const getYouTubeID = require("get-youtube-id")
const fetchVideoInfo = require("youtube-info")

const bot = new Discord.Client()

const prefix = botSettings.prefix
bot.guilds = {}
bot.yt_api_key = "AIzaSyBzb-OKZqfwHkk_ci-oRME4U50QTxXkj1Y"
bot.commands = new Discord.Collection()
bot.queue = []
bot.queuenames = []
bot.isPlaying = false
bot.dispatcher = null
bot.voiceChannel = null;
bot.skipReq = 0
bot.skippers = []


fs.readdir("./cmds", (err, files) =>{
    if (err) console.error(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
        console.log("No Commands To Load!")
        return
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`)
        console.log(`${i = 1}: ${f} Loaded!`)
        bot.commands.set(props.help.name, props)

    })

})

bot.on("ready", () =>{
    console.log("Bot is now online!")
    console.log('The current prefix is: ' + botSettings.prefix)
    console.log("Running on the name: " + bot.user.username)
    console.log('The current id is: ' + bot.user.id)
})

bot.on("message", async message =>{
    if(message.author.bot) return
    if(message.channel.type === "dm") return;

    if(!guilds[message.guild.id]){
      guilds[message.guild.id] = {
        queue: [],
        queuenames: [],
        isPlaying: false,
        dispatcher: null,
        voiceChannel: null,
        skipReq: 0,
        skippers: []
      }
    } else {
      continue;
    }

    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args)
})

bot.login(botSettings.token)
