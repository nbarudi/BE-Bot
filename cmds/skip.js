const Discord = module.require("discord.js")
const ytdl = require("ytdl-core")

module.exports.run = async (bot, message, args) => {

  function playMusic(id, message){
    bot.voiceChannel = message.member.voiceChannel



    bot.voiceChannel.join().then(function (connection){
      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
        filter: 'audioonly'
      })
      bot.skipReq = 0
      bot.skippers = []

      bot.dispatcher = connection.playStream(stream)
      bot.dispatcher.on(`end`, function(){
        bot.skipReq = 0
        bot.skippers = []
        bot.queue.shift()
        bot.queuenames.shift()
        if (bot.queue.length === 0){
          bot.queue = []
          bot.queuenames = []
          bot.isPlaying = false
        } else {
          setTimeout(function () {
              playMusic(bot.queue[0],message)
          }, 500)

        }
      })
    })
  }

  function skip_song(message){
    bot.disbatcher.end()
  }

  if(bot.skippers.indexOf(message.author.id) === -1) {
    bot.skippers.push(message.author.id)
    bot.skipReq++
    if (bot.skipReq >= Math.ceil((bot.voiceChannel.members.size -1)/2)) {
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
