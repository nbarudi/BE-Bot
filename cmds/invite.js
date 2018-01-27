const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
  let link = await bot.generateInvite(["ADMINISTRATOR"])

  message.author.send("The invite code is: " + link)

  message.channel.send(`Invite sent in a Private Message`).then(message => message.delete(5000))



}

module.exports.help = {
    name: "invite"
}
