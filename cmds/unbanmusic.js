const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

var usernames = message.mentions.users.first()
  if (message.author.username = "nbarudi") {
    for (i = 1; i < bot.newguilds[message.guild.id].musicbans; i++){
      if (bot.newguilds[message.guild.id].musicbans[i] == usernames.username){
        bot.newguilds[message.guild.id].musicbans[i] = null
        message.reply(" User unbanned!")
      } else {
        message.reply(" User not banned!")
      }
    }
  } else {
    message.reply(" You cannot ban users from using music!")
  }

}

module.exports.help = {
    name: "unmusicban"
}
