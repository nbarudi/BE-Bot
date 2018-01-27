const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  var usernames = message.mentions.users.first()
    if (message.author.username = "nbarudi") {
      for (i = 1; i < bot.newguilds[message.guild.id].musicbans; i++){
        if (bot.newguilds[message.guild.id].musicbans[i] == usernames.username){
          message.reply(" User is already banned!")
        } else {
          bot.newguilds[message.guild.id].musicbans.push(usernames.username)
          message.reply(" Banned user : " + usernames.username + " from using music commands!")
        }
      }
    } else {
      message.reply(" You cannot ban users from using music!")
    }

  }
module.exports.help = {
    name: "musicban"
}
