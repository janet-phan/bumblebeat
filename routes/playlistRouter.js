const express = require("express");
const router = express.Router();

const { getAllPlaylists, getPlaylistById } = require("../controllers/playlistController");

router.get("/playlists", getAllPlaylists);

router.get("/playlists/:_id", getPlaylistById);

module.exports = router;
