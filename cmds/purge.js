const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    var hours = (new Date()).getHours();
    let adminRole = message.guild.roles.find("name", "Moderator")
    let templogs = message.guild.channels.find("name", "logs")
    if(!message.member.roles.has(adminRole.id)) return message.channel.send("Sorry, you do not have the correct permissions!")
    var newValue
    var person = message.guild.member(message.author)

    if(args.length === 0){
        console.log("No args given!")
        newValue = 2;
    } else {
        newValue = args[0]
        console.log(newValue)
    }

    let messagecount = newValue.toString()
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => {
        message.channel.bulkDelete(messages)
        message.channel.send(`Deleted a total of ${messagecount} messages!`).then(message => message.delete(5000))
        console.log("Info Message Removed! Messages Removed As planned!")
    })

    

    if(message.guild.channels.has(templogs.id)) {
        embed = new Discord.RichEmbed()
        embed.setTitle(`Purging!`)
        embed.addField(`Purge: `, `${message.author} Purged ${messagecount} messages!`)
        embed.addField(`Rank: `, `${person.highestRole}`)
        embed.addField(`Ran At: `, `${hours} hours into the day`)
        embed.setColor(`#ff0000`)
        templogs.send({embed: embed})
    return
    } else {
        message.channel.send("It is recommended to have a logs channel!")
    }
    
}

module.exports.help = {
    name: "purge"
}