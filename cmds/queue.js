const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

  var mess = "```"
  for (var i = 0; i < bot.queuenames.length; i++ ) {
    var temp = (i + 1) + " : " + bot.queuenames[i] + (i === 0 ? "**(Current Songs)**" : "") + "\n"
    if ((mess + temp) <= 2000 - 3) {
      mess += temp

    }else {
      mess += "```"
      message.channel.send(mess)
      mess = "```"
    }
  }
mess += "```"
message.channel.send(mess)

}

module.exports.help = {
    name: "queue"
}