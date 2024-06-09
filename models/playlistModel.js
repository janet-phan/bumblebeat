const mongoose = require("mongoose");

const { Schema } = mongoose;

const playlistSchema = new Schema({
    playlistName: String,
    songs: [
      {
        title: String,
        artist: String,
        album: String,
        duration: Number
      }
    ]
  });

  const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;