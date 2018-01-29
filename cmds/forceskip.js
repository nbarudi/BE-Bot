const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  if (message.author.id === 146065389460127745) {
    function skip_song(message){
      bot.newguilds[message.guild.id].dispatcher.end()
      return
    }
  } else {
    message.reply(" You cannot use the force skip command!")
  }

}

module.exports.help = {
    name: "forceskip"
}
