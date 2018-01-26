const Discord = module.require("discord.js")
const request = module.require("request")
const fetchVideoInfo = require("youtube-info")
const ytdl = require("ytdl-core")
const getYouTubeID = require("get-youtube-id")

module.exports.run = async (bot, message, args) => {

  function isYoutube(str) {
    return str.indexOf("youtube.com") > -1
  }

  function search_video(querry, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(querry) + "&key=" + bot.yt_api_key, function(error, response, body) {
      var json = JSON.parse(body)
      if (!json.items[0]) callback("pyXhsTTD0Tk")
      else{
      callback(json.items[0].id.videoId)
    }})
  }

  function getID(str, cb){
    if(isYoutube(str)) {
      cb(getYouTubeID(str))
    } else {
      search_video(str, function(id) {
        cb(id)
      })
    }
  }

  function add_to_queue(strID, mess){
    if (isYoutube(strID)) {
      bot.guilds[message.guild.id].queue.push(getYouTubeID(strID))
    }else {
      bot.guilds[message.guild.id].queue.push(strID)
    }
  }

  function playMusic(id, message){
    if (message.member.voiceChannel == null) {
      message.reply(" You must be in a voice channel to use this command!")
    } else {
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
          message.channel.send(" Songs now ended!")
          bot.guilds[message.guild.id].voiceChannel.leave()
        } else {
          setTimeout(function () {
              playMusic(bot.guilds[message.guild.id].queue[0],message)
          }, 500)

        }
      })
    })
  }
}
  if (bot.guilds[message.guild.id]){
      guilds[message.guild.id] = {
        queue: [],
        queuenames: [],
        isPlaying: false,
        dispatcher: null,
        voiceChannel: null,
        skipReq: 0,
        skippers: []
      }
  } else {
  if (bot.guilds[message.guild.id].queue.length > 0 || bot.guilds[message.guild.id].isPlaying) {
    getID(args, function(id) {
      add_to_queue(id, message)
      fetchVideoInfo(id, function (err, videoInfo){
        if (err) throw new Error(err)
        message.reply("Added to queue: **" + videoInfo.title + "**")
        bot.guilds[message.guild.id].queuenames.push(videoInfo.title)
      })
    })
  } else {
    bot.guilds[message.guild.id].isPlaying = true;
    getID(args, function (id) {
      bot.guilds[message.guild.id].queue.push("placeholder")
      playMusic(id, message)
      fetchVideoInfo(id, function (err, videoInfo){
        if (err) throw new Error(err)
        message.reply("Now playing: **" + videoInfo.title + "**")
      })
    })
  }


}
}

module.exports.help = {
    name: "play"
}
