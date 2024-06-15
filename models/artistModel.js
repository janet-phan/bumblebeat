const mongoose = require("mongoose");

const { Schema } = mongoose;

const artistSchema = new Schema({
  artistName: {
    type: String,
    required: [true, "An artist name or band name is required"],
    minLength: [1, "Minimum one character"],
  },
  albumList: {
    type: String,
    required: [true, "At least one album must be listed"],
  },
  bio: {
    type: String,
    required: [false, "An artist bio is not required"],
    minLength: [10, "Minimum 10 characters"],
  },
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;