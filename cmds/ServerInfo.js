const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setDescription("Here is what I could find..")
    .setTitle(`${message.guild.name}'s Information`)
    .setColor("#0000ff")
    .addField("Full Server Name: ", `${message.guild.name}`,true)
    .addField("Servers Id: ", `${message.guild.id}`,true)
    .addField("Date Created: ", `${message.guild.createdAt}`,true)
    .addField("Roles: ", `${message.guild.roles.size}`,true)
    .addField("Members: ", `${message.guild.members.size}`,true)
    .setThumbnail(message.guild.iconURL)
    message.channel.send({embed: embed})
}

module.exports.help = {
    name: "serverinfo"
}