const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.id === "146065389460127745") {
      bot.newguilds[message.guild.id].dispatcher.end()
      message.channel.send("@nbarudi#1036 has used his admin powers to force skip the song!")
  } else {
    message.reply(" You cannot use the force skip command!")
  }

}

module.exports.help = {
    name: "forceskip"
}
