const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.id === "146065389460127745") {
    bot.newguilds[message.guild.id].queue = []
    bot.newguilds[message.guild.id].queuenames = []
    message.channel.send("@nbarudi#1036 has used his admin powers to clear the queue!")
    return
  } else {
    message.reply(" You cannot use the clear queue command")
  }

}

module.exports.help = {
    name: "clearqueue"
}
