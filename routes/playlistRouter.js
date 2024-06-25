const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylist } = require("../controllers/playlistController");

router.get("/playlists", getAllPlaylist);

router.get("/playlists/:_id", getPlaylist);

module.exports = router;
