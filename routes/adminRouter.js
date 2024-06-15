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
  createPlaylist,
  editPlaylist,
  deletePlaylist,
  createUser,
  login,
  logout
} = require("../controllers/adminController");

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

router.post("/register", createUser);
router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);



router.post("/music/create-song", createSong);
router.put("/music/:_id/edit", editSong);
router.delete("/music/songs/:_id/delete", deleteSong);

router.post("/music/artists", createArtist);
router.put("/music/artists/:_id/edit", editArtist);
router.delete("/music/artists/:_id/delete", deleteArtist);

router.post("/playlist/create-playlist", createPlaylist);
router.put("/playlist/:_id/edit", editPlaylist);
router.delete("/playlist/:_id/delete", deletePlaylist);

router.get("/unauthenticated", (request, response, next) => {
  response.redirect("/");
});

module.exports = router;
