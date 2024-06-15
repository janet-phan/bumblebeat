const siteData = require('../data/siteData');
const Song = require("../models/songModel");
// const songData = require("../data/songData")

//read all songs
const getAllSongs = async (request, response, next) => {
  try {
    const songs = await Song.find({});
    response.status(200).json({
      success: { message: "This route points to the Music page with all of the songs" },
      data: songs,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

//read a song by the ID
const getSong = async (request, response, next) => {
  const { _id } = request.params;

    await Song.findOne({ _id: _id }).then((song) => {
    response.status(200).json({
      success: { message: "This route points to the Music page with one of the songs by the ID" },
      data: song, siteData,
      statusCode: 200
    });  
  } 
  ) 
};

module.exports = { getAllSongs, getSong };
