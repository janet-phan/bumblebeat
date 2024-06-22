const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  createSong,
  editSong,
  deleteSong,
  createArtist,
  editArtist,
  deleteArtist,
  deletePlaylist,
  createUser,
  userLogin,
  viewProfile,
  userLogout,
} = require("../controllers/siteController");

const {
  getAllPlaylist,
  getPlaylist,
  createPlaylist,
  editPlaylist,
} = require("../controllers/playlistController");

const { getAllArtists, getArtist } = require("../controllers/artistController");
const { getAllSongs, getSong } = require("../controllers/songController");

const checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect(403, "/unauthenticated");
  }
};

router.get("/admin", checkAuthentication, (request, response, next) => {
  try {
    response.json("Authenticated");
  } catch (error) {
    next(error);
  }
});

router.get("/logout", logout);

router.get("/music/songs/all", getAllSongs);
router.get("/music/songs/:_id/", getSong);
router.post("/music/create-song", createSong);
router.put("/music/:_id/edit", editSong);
router.delete("/music/songs/:_id/delete", deleteSong);

router.get("/music/artists", getAllArtists);
router.get("/music/artists/_id:/view", getArtist);
router.post("/music/createartists", createArtist);
router.put("/music/artists/:_id/edit", editArtist);
router.delete("/music/artists/:_id/delete", deleteArtist);

router.post("/playlist/create-playlist", createPlaylist);
router.put("/playlist/:_id/edit", editPlaylist);
router.delete("/playlist/:_id/delete", deletePlaylist);

router.get("/unauthenticated", (request, response, next) => {
  response.redirect("/");
});

module.exports = router;
