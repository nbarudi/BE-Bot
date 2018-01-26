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
      callback(json.items[0].id.videoId)
    })
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

  function add_to_queue(strID){
    if (isYoutube(strID)) {
      bot.queue.push(getYouTubeID(strID))
    }else {
      bot.queue.push(strID)
    }
  }

  function playMusic(id, message){
    if (message.member.voiceChannel == null) {
      message.reply(" You must be in a voice channel to use this command!")
    } else {
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
}

  if (bot.queue.length > 0 || bot.isPlaying) {
    getID(args, function(id) {
      add_to_queue(id)
      fetchVideoInfo(id, function (err, videoInfo){
        if (err) throw new Error(err)
        message.reply("Added to queue: **" + videoInfo.title + "**")
      })
    })
  } else {
    bot.isPlaying = true;
    getID(args, function (id) {
      bot.queue.push("placeholder")
      playMusic(id, message)
      fetchVideoInfo(id, function (err, videoInfo){
        if (err) throw new Error(err)
        message.reply("Now playing: **" + videoInfo.title + "**")
      })
    })
  }


}

module.exports.help = {
    name: "play"
}
