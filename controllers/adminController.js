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
        response
        .status(201)
        .json({ success: "A new song has been added", data: newSong, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while adding a song", data: newSong, statusCode: 400 });
    }
}

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
        response
        .status(400)
        .json({ error: "Something happened while editing a song", statusCode: 400 });
    }
}

const deleteSong = async (request, response, next) => {
    const { _id } = request.params;

    await Song.findByIdAndDelete({ _id: _id });

    try {
        response.status(200).json({
            success: `The song with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while deleting a song", statusCode: 400 });
    }
}

const createArtist = async (request, response, next) => {
    const { artistName, albumList, bio } = request.body;

    const newArtist = new Artist({
        artistName: artistName, 
        albumList: albumList, 
        bio: bio 
      });

    try {
        await newArtist.save(); 
        response
        .status(201)
        .json({ success: "A new artist has been created", data: newArtist, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while creating an artist", data: newArtist, statusCode: 400 });
    }
}


const editArtist = async (request, response, next) => {
    const { _id } = request.params;

    const { artistName, albumList, bio } = request.body;

    const updatedArtist = {
        artistName: artistName, 
        albumList: albumList, 
        bio: bio 
    };

    await Artist.findByIdAndUpdate({ _id: _id }, updatedArtist);

    try {
        response.status(200).json({
            success: `The artist with id ${_id} is updated successfully`,
            data: updatedArtist,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while editing an artist", statusCode: 400 });
    }
}


const deleteArtist = async (request, response, next) => {
    const { _id } = request.params;
    await Artist.findByIdAndDelete({ _id: _id });

    try {
        response.status(200).json({
            success: `The artist with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while deleting an artist", statusCode: 400 });
    }
}

module.exports = {createSong, editSong, deleteSong, createArtist, editArtist, deleteArtist};