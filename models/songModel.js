const mongoose = require("mongoose");

const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: [true, "A song title is required"],
  },
  artist: {
    type: String,
    required: [true, "The artist's name is required"],
  },
  album: {
    type: String,
    required: [true, "The album name is required"],
  },
  year: {
    type: Number,
    required: [true, "The album year is required"],
    min: [1930, "Minimum year is 1930"],
    max: [2024, "Maximum year is 2024"],
  }
});

const Song = mongoose.model("Songs", songSchema);

module.exports = Song;