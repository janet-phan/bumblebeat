const express = require("express");
const router = express.Router();

const { getAllPlaylist, getPlaylist, createPlaylist, editPlaylist } = require("../controllers/playlistController");

router.post("/playlist/create-playlist", createPlaylist);
router.get("/playlist", getAllPlaylist);
router.get("/playlist/:_id", getPlaylist);
router.get("/playlist/create", createPlaylist);
router.get("/playlist/edit", editPlaylist);

router.put("/playlist/:_id/edit", editPlaylist);
router.delete("/playlist/:_id/delete", deletePlaylist);

module.exports = router;
