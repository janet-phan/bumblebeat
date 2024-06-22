const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylist, createPlaylist, editPlaylist } = require("../controllers/playlistController");

router.get("/playlist", getAllPlaylist);
router.get("/playlist/:_id", getPlaylist);
router.get("/playlist/create", createPlaylist);
router.get("/playlist/edit", editPlaylist);

module.exports = router;
