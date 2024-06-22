const mongoose = require("mongoose");
const Song = require('./songModel')

const { Schema } = mongoose;

const playlistSchema = new Schema({
    playlistName: String,
    songs: [
      {
        title: String,
        artist: String,
        album: String,
        time: Number
      }
    ]
  });

  const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;