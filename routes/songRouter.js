const express = require("express");
const router = express.Router();

const { getAllSongs, getSong } = require("../controllers/songController");

router.get("/music", getAllSongs);

router.get("/music/:_id", getSong);

router.get("/music/songs/all", getAllSongs);
router.get("/music/songs/:_id/", getSong);

module.exports = router;
