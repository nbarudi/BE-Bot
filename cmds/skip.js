const Discord = module.require("discord.js")
const ytdl = require("ytdl-core")

module.exports.run = async (bot, message, args) => {

  function playMusic(id, message){

    if (message.member.voiceChannel == null) {
      message.reply(" You must be in a voice channel to use this command!")
    }


    bot.newguilds[message.guild.id].voiceChannel = message.member.voiceChannel
    bot.newguilds[message.guild.id].voiceChannel.join().then(function (connection){
      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
        filter: 'audioonly'
      })
      bot.newguilds[message.guild.id].skipReq = 0
      bot.newguilds[message.guild.id].skippers = []

      bot.newguilds[message.guild.id].dispatcher = connection.playStream(stream)
      bot.newguilds[message.guild.id].dispatcher.on(`end`, function(){
        bot.newguilds[message.guild.id].skipReq = 0
        bot.newguilds[message.guild.id].skippers = []
        bot.newguilds[message.guild.id].queue.shift()
        bot.newguilds[message.guild.id].queuenames.shift()
        if (bot.newguilds[message.guild.id].queue.length === 0){
          bot.newguilds[message.guild.id].queue = []
          bot.newguilds[message.guild.id].queuenames = []
          bot.newguilds[message.guild.id].isPlaying = false
        } else {
          setTimeout(function () {
              playMusic(bot.newguilds[message.guild.id].queue[0],message)
          }, 500)

        }
      })
    })
  }

  function skip_song(message){
    bot.newguilds[message.guild.id].dispatcher.end()
  }

  if(bot.newguilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
    bot.newguilds[message.guild.id].skippers.push(message.author.id)
    bot.newguilds[message.guild.id].skipReq++
    if (bot.newguilds[message.guild.id].skipReq >= Math.ceil((bot.newguilds[message.guild.id].voiceChannel.members.size -1)/2)) {
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
