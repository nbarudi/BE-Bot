const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (args.lenth === 0) return message.channel.send("You must input a question!")

    function pickachoice(){
         var rand = ['Yes', 'No', 'It is unknown!', '100% Garenty', 'Maybe', 'Never', 'Not a chance'];

         return rand[Math.floor(Math.random()*rand.length)];
    }

    message.channel.send(pickachoice()).then(message => message.delete(5000))

}

module.exports.help = {
    name: "8ball"
}