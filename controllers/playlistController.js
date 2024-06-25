const siteData = require('../data/siteData');
const Playlist = require('../models/playlistModel');

const getAllPlaylist = async (request, response, next) => { 
  try {
    const playlists = await Playlist.find({});
    response.status(200).json({
      success: "This route points to the Playlists page with all of the playlists",
      data: playlists,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getPlaylistById = async (request, response, next) => {
  const { _id } = request.params;

await Playlist.findOne({ _id: _id }).then((playlist) => {
  response.status(200).json({
    success: { message: "This route points to the playlist page with the selected playlist" },
    data: playlist, siteData,
    statusCode: 200
  });  
} 
) 
};

module.exports = { getAllPlaylist, getPlaylistById };