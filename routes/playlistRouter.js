const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylist } = require("../controllers/playlistController");

router.get("/playlist", getAllPlaylist);

router.get("/playlist/:_id", getPlaylist);

module.exports = router;
