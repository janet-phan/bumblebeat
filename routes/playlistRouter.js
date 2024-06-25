const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylistById } = require("../controllers/playlistController");

router.get("/playlist", getAllPlaylist);
router.get("/playlist/:_id", getPlaylistById);

module.exports = router;
