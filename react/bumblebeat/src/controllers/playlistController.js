const siteData = require('../data/siteData');
const Playlist = require('../models/playlistModel');

const getAllPlaylist = async (request, response, next) => { 
    await Artist.find({}).then((authors) =>
    response.status(200).json({
      success: { message: "This route points to the Playlists page with all of the playlists" },
      data: authors, siteData,
      statusCode: 200,
    })
   )
}

const getPlaylist = async (request, response, next) => {
  const { _id } = request.params;
    await Playlist.findOne({_id: _id}).then((playlist) => {
    response.status(200).json({
      success: { message: "This route points to the playlist page with the selected playlist" },
      data: playlist, siteData, 
      statusCode: 200,
    });  
    })
}

const createPlaylist = async (request, response, next) => {
  const { playlistName, title, artist, album, time } = request.body;

  const newPlaylist = new Playlist({
    playlistName: String,
    songs: [
      {
        title: String,
        artist: String,
        album: String,
        time: Number,
      },
    ],
  });

  try {
    await newPlaylist.save();
    response
      .status(201)
      .json({
        success: "A new playlist has been created",
        data: newPlaylist,
        statusCode: 201,
      });
  } catch (error) {
    response
      .status(400)
      .json({
        error: "Something happened while creating a playlist",
        data: newPlaylist,
        statusCode: 400,
      });
  }
};

const editPlaylist = async (request, response, next) => {
  const { _id } = request.params;

  const { playlistName, title, artist, album, duration } = request.body;

  // const updatedPlaylist = {
  //   playlistName: String,
  //   songs: [
  //     {
  //       title: String,
  //       artist: String,
  //       album: String,
  //       duration: Number,
  //     },
  //   ],
  // };

  const newSong = new Song({
    title: title,
    artist: artist,
    album: album,
    duration: duration,
  });

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    { _id: _id },
    { $addToSet: { songs: newSong } },
    { new: true }
  );

  try {
    response.status(200).json({
      success: `The playlist with id ${_id} is updated successfully`,
      data: updatedPlaylist,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while editing the playlist",
      statusCode: 400,
    });
  }
};
  
const deletePlaylist = async (request, response, next) => {
  const { _id } = request.params;

  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(_id);
  
    response.status(200).json({
      success: `The playlist with id ${_id} is deleted successfully`,
      data: updatedPlaylist,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while deleting the playlist",
      statusCode: 400,
    });
  }
};

module.exports = { getAllPlaylist, getPlaylist, createPlaylist, editPlaylist,  deletePlaylist };