const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    var hours = (new Date()).getHours();
    let adminRole = message.guild.roles.find("name", "Moderator")
    let templogs = message.guild.channels.find("name", "logs")
    if(!message.member.roles.has(adminRole.id)) return message.channel.send("Sorry, you do not have the correct permissions!")

        let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!toKick) return message.channel.send("User was not found.. Make sure you mention a user or use their ID")
        var person = message.guild.member(message.author)

        message.guild.member(toKick).kick("You have been removed! If this is a mistake then send a message to the owner of  the discord!")

        message.channel.send(`Kicked ${toKick}!`).then(message => message.delete(5000))
        if(message.guild.channels.has(templogs.id)) {
        embed = new Discord.RichEmbed()
        embed.setTitle(`Kicking!`)
        embed.addField(`Kicked: `, `${message.author} Kicked ${toKick} from the server!`)
        embed.addField(`Rank: `, `${person.highestRole}`)
        embed.addField(`Ran At: `, `${hours} hours into the day`)
        embed.setColor(`#ff0000`)
        templogs.send({embed: embed})
        } else {
            message.channel.send("It is recommended to have a logs channel!")
        }
        return
}

module.exports.help = {
    name: "kick"
}