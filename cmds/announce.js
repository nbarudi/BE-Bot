const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    

    let modRole = message.guild.roles.find("name", "Moderator")
    let templogs = message.guild.channels.find("name", "announcements")
    if(message.member.roles.has(modRole.id)){
        let announcement = args.join(" ")
    if(message.guild.channels.has(templogs.id)) {
        templogs.send("@everyone")
    embed = new Discord.RichEmbed()
    embed.setTimestamp()
    embed.setColor("#f442e2")
    embed.addField(`New announcement by: ${message.author.username}`, `${announcement}`)
    templogs.send({embed: embed})
    } else {
        message.channel.send("You must have a announcement channel to use this command!")
    }
    } else {
        message.channel.send(`${message.author}: You do not have permission to run this command! You must atleast have: ${modRole.name} to use w.announce`)
    }
    }



module.exports.help = {
    name: "announce"
}