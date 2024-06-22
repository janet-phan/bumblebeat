const Song = require("../models/songModel");
const Artist = require("../models/artistModel");

const createSong = async (request, response, next) => {
  const { title, artist, album, year, time } = request.body;

  const newSong = new Song({
    title: title,
    artist: artist,
    album: album,
    year: year,
    time: time,
  });

  try {
    await newSong.save();
    response.status(201).json({
      success: "A new song has been added",
      data: newSong,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while adding a song",
      data: newSong,
      statusCode: 400,
    });
  }
};

const editSong = async (request, response, next) => {
  const { _id } = request.params;

  const { title, artist, album, year, time } = request.body;

  const updatedSong = {
    title: title,
    artist: artist,
    album: album,
    year: year,
    time: time,
  };

  await Song.findByIdAndUpdate({ _id: _id }, updatedSong);

  try {
    response.status(200).json({
      success: `The song with id ${_id} is updated successfully`,
      data: updatedSong,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while editing a song",
      statusCode: 400,
    });
  }
};

const deleteSong = async (request, response, next) => {
  const { _id } = request.params;

  await Song.findByIdAndDelete({ _id: _id });

  try {
    response.status(200).json({
      success: `The song with id ${_id} is deleted successfully`,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while deleting a song",
      statusCode: 400,
    });
  }
};

const createArtist = async (request, response, next) => {
  const { artistName, albumList, bio } = request.body;

  const newArtist = new Artist({
    artistName: artistName,
    albumList: albumList,
    bio: bio,
  });

  try {
    await newArtist.save();
    response.status(201).json({
      success: "A new artist has been created",
      data: newArtist,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while creating an artist",
      data: newArtist,
      statusCode: 400,
    });
  }
};

const deletePlaylist = async (request, response, next) => {
  const { _id } = request.params;
  await Playlist.findByIdAndDelete({ _id: _id });

  try {
    response.status(200).json({
      success: `The playlist with id ${_id} is deleted successfully`,
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: "Something happened while deleting the playlist",
      statusCode: 400,
    });
  }
};

const createUser = async (request, response, next) => {
  const { username, email, password } = request.body;

  try {
    response.status(201).json({
      success: "User created successfully!",
      statusCode: 201,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const viewProfile = (request, response, next) => {
  try {
    const userDetails = {
      id: request.user.id,
      username: request.user.username,
      email: request.user.email,
    };

    response.json({ message: "Viewing user profile", user: userDetails });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (request, response, next) => {
  request.logout((error) => {
    if (error) {
      response.status(400).json({
        error: { message: "Something went wrong when logging out" },
        statusCode: 400,
      });
    } else {
      response.json("Successfully logged out");
    }
  });
};

const userLogin = async (request, response, next) => {
  request.login((error) => {
    if (error) {
      response.status(400).json({
        error: { message: "Something went wrong logging you in!" },
        statusCode: 400,
      });
    } else {
      response.json("Successfully logged in!");
    }
  });
};

module.exports = {
  createSong,
  editSong,
  deleteSong,
  createArtist,
  deletePlaylist,
  createUser,
  userLogin,
  viewProfile,
  userLogout,
};
