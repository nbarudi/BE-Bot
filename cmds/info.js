const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    let person = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!person) return message.channel.sendMessage("User was not found..")
    let embed = new Discord.RichEmbed()
    .setDescription("Here is what I could find..")
    .setTitle(`${person.user.username}'s Information`)
    .setColor("#0000ff")
    .addField("Full Username: ", `${person.user.username}#${person.user.discriminator}`,true)
    .addField("Users Id: ", `${person.id}`,true)
    .addField("Created At: ", `${person.user.createdAt}`,true)
    .addField("Users highest role: ", `${person.highestRole}`,true)
    .setThumbnail(person.user.avatarURL)
    message.channel.send({embed: embed})
}

module.exports.help = {
    name: "info"
}