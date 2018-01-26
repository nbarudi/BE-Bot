const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  queueNames = bot.guilds[message.guild.id].queuenames

  var message2 = "```"
    for (var i = 0; i < queueNames.length; i++){
      var temp = (i + 1) + ": " + queueNames[i] + (i === 0 ? "**Current Song**" : "") + "\n";
      if ((message2 + temp).length <= 2000 - 3){
        message2 += temp
      } else {
        message2 += "```";
        message.channel.send(message2)
        message2 = "```";

      }
    }
    message2 += "```"
    message.channel.send(message2)
    message2 = "```"

}

module.exports.help = {
    name: "queue"
}
