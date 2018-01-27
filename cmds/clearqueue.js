const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.username = "nbarudi") {
    bot.newguilds[message.guild.id].queue = []
    bot.newguilds[message.guild.id].queuenames = []
  } else {
    message.reply(" You cannot use the clear queue command")
  }

}

module.exports.help = {
    name: "clearqueue"
}
