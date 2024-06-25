const siteData = require('../data/siteData');
const Playlist = require('../models/playlistModel');

const getAllPlaylists = async (request, response, next) => { 
  try {
    const playlists = await Playlist.find({});
    response.status(200).json({
      success: "This route points to the Playlists page with all of the playlists",
      data: playlists,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistById = async (request, response, next) => {
  try {
    const { _id } = request.params;
    const playlist = await Playlist.findOne({ _id });
    response.status(200).json({
      success: "This route points to the playlist page with the selected playlist",
      data: playlist,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllPlaylists, getPlaylistById };