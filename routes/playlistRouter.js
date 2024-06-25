const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylistById } = require("../controllers/playlistController");

router.get("/playlists", getAllPlaylist);
router.get("/playlists/:_id", getPlaylistById);

module.exports = router;
