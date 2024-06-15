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



module.exports = { getAllArtists, getArtist };