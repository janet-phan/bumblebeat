const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylist, createPlaylist, editPlaylist, deletePlaylist } = require("../controllers/playlistController");


router.get("/playlist", getAllPlaylist);
router.get("/playlist/:_id", getPlaylist);
router.post("/playlist/create-playlist", createPlaylist);
router.put("/playlist/:_id/edit", editPlaylist);
router.delete("/playlist/:_id/delete", deletePlaylist);

module.exports = router;
