const express = require("express");
const router = express.Router();

const { getAllSongs, getSong, getSongs } = require("../controllers/songController");

router.get("/music", getAllSongs);

router.get("/music/:_id", getSong);

module.exports = router;
