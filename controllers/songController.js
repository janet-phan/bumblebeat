const siteData = require('../data/siteData');
const Song = require("../models/songModel");
// const songData = require("../data/songData")

//read all songs
const getAllSongs = async (request, response, next) => {
    await Song.find({}).then((songs) =>
    response.status(200).json({
      success: { message: "This route points to the Music page with all of the songs" },
      data: songs, siteData,
      statusCode: 200,
    })
    )
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
