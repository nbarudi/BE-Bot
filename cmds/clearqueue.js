const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.id === "146065389460127745") {
    bot.newguilds[message.guild.id].queue = []
    bot.newguilds[message.guild.id].queuenames = []
    return
  } else {
    message.reply(" You cannot use the clear queue command")
  }

}

module.exports.help = {
    name: "clearqueue"
}
