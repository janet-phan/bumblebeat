const siteData = require('../data/siteData');
const Artist = require('../models/artistModel');

const getAllArtists = async (request, response, next) => { 
  try {
    const artists = await Artist.find({});
    response.status(200).json({
      success: { message: "This route points to the Artist page with all of the artists" },
      data: artists,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getArtist = async (request, response, next) => {
  const { _id } = request.params;
    await Artist.findOne({_id: _id}).then((artist) => {
    response.status(200).json({
      success: { message: "This route points to the Artist page with one of the artists by the ID" },
      data: artist, siteData, 
      statusCode: 200,
    });  
    })
}

const editArtist = async (request, response, next) => {
  const { _id } = request.params;

  const { artistName, albumList, bio } = request.body;

  const updatedArtist = {
    artistName: artistName,
    albumList: albumList,
    bio: bio,
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
      .json({
        error: "Something happened while editing an artist",
        statusCode: 400,
      });
  }
};

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
      .json({
        error: "Something happened while deleting an artist",
        statusCode: 400,
      });
  }
};


module.exports = { getAllArtists, getArtist, editArtist, deleteArtist };