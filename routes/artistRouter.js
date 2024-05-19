const express = require("express");
const router = express.Router();

const { getAllArtists, getArtist } = require("../controllers/artistController");

router.get("/artists", getAllArtists);

router.get("/artists/:_id", getArtist);

module.exports = router;
