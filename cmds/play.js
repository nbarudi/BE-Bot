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
      bot.newguilds[message.guild.id].queue.push(getYouTubeID(strID))
    }else {
      bot.newguilds[message.guild.id].queue.push(strID)
    }
  }

  function playMusic(id, message){
    if (message.member.voiceChannel == null) {
      message.reply(" You must be in a voice channel to use this command!")
      return
    } else {
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
          message.channel.send(" Songs now ended!")
          bot.newguilds[message.guild.id].voiceChannel.leave()
        } else {
          setTimeout(function () {
              playMusic(bot.newguilds[message.guild.id].queue[0],message)
          }, 500)

        }
      })
    })
  }
}

for (i = 0; i < bot.newguilds[message.guild.id].musicbans; i++){
  if (bot.newguilds[message.guild.id].musicbans[i] == message.author.username){
    message.reply(" You are banned from using music commands!")
    return;
  }
}
  if (bot.newguilds[message.guild.id].queue.length > 0 || bot.newguilds[message.guild.id].isPlaying) {
    getID(args, function(id) {
      add_to_queue(id, message)
      fetchVideoInfo(id, function (err, videoInfo){
        if (err) throw new Error(err)
        message.reply("Added to queue: **" + videoInfo.title + "**")
        bot.newguilds[message.guild.id].queuenames.push(videoInfo.title)
      })
    })
  } else {
    bot.newguilds[message.guild.id].isPlaying = true;
    getID(args, function (id) {
      bot.newguilds[message.guild.id].queue.push("placeholder")
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
