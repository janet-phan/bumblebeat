const express = require("express");
const router = express.Router();

const { getAllArtists, getArtist, editArtist, deleteArtist } = require("../controllers/artistController");

router.get("/artists", getAllArtists);
router.get("/artists/:_id", getArtist);
router.put("/artists/edit", editArtist);
router.delete("/artists/delete", deleteArtist);


module.exports = router;
