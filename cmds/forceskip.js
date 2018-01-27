const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.username = "nbarudi") {
    function skip_song(message){
      bot.newguilds[message.guild.id].dispatcher.end()
    }
  } else {
    message.reply(" You cannot use the force skip command!")
  }

}

module.exports.help = {
    name: "queue"
}
