const Discord = module.require("discord.js")
const ytdl = require("ytdl-core")

module.exports.run = async (bot, message, args) => {

  function playMusic(id, message){

    if (message.member.voiceChannel == null) {
      message.reply(" You must be in a voice channel to use this command!")
    }

    bot.guilds[message.guild.id].voiceChannel = message.member.voiceChannel
    bot.guilds[message.guild.id].voiceChannel.join().then(function (connection){
      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
        filter: 'audioonly'
      })
      bot.guilds[message.guild.id].skipReq = 0
      bot.guilds[message.guild.id].skippers = []

      bot.guilds[message.guild.id].dispatcher = connection.playStream(stream)
      bot.guilds[message.guild.id].dispatcher.on(`end`, function(){
        bot.guilds[message.guild.id].skipReq = 0
        bot.guilds[message.guild.id].skippers = []
        bot.guilds[message.guild.id].queue.shift()
        bot.guilds[message.guild.id].queuenames.shift()
        if (bot.guilds[message.guild.id].queue.length === 0){
          bot.guilds[message.guild.id].queue = []
          bot.guilds[message.guild.id].queuenames = []
          bot.guilds[message.guild.id].isPlaying = false
        } else {
          setTimeout(function () {
              playMusic(bot.guilds[message.guild.id].queue[0],message)
          }, 500)

        }
      })
    })
  }

  function skip_song(message){
    bot.guilds[message.guild.id].dispatcher.end()
  }

  if(bot.guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
    bot.guilds[message.guild.id].skippers.push(message.author.id)
    bot.guilds[message.guild.id].skipReq++
    if (bot.guilds[message.guild.id].skipReq >= Math.ceil((bot.guilds[message.guild.id].voiceChannel.members.size -1)/2)) {
      skip_song(message)
      message.reply(" the song has been skipped!")
    } else {
      message.reply(" skip added! 50% of people in the voice channel need to skip for it to take affect!")
    }
  }

}

module.exports.help = {
    name: "skip"
}
