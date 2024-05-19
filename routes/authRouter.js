const express = require("express");
const passport = require("passport");
const router = express.Router();



const {createSong, editSong, deleteSong, createArtist, editArtist, deleteArtist} = require("../controllers/adminController");

const {register} = require("../controllers/authController")

const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect(403, "/unauthenticated");
    }
};

router.get("/admin", checkAuthentication, (request, response, next) => {
    try {
        router.get("/auth", (request, response, next) => {
            response.json("Authenticated");
        });
    
    router.post("../music/create-song", createSong);
    router.put("../music/:_id/edit", editSong);
    router.delete("/music/:_id/delete", deleteSong);

    router.post("../music/artists", createArtist);
    router.put("../music/artists/:_id/edit", editArtist);
    router.delete("../music/artists:_id/delete", deleteArtist);
} catch (error) {
    console.log(error)
}
});


router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/");
});

router.post("../register", register);

//implement Google Strategy

//GET to the path of /login/google with passport authentication of the google route and providing a scope object of an array with a string of profile
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

//GET to the path of /login/google/failed with a callback that has a res.status.json where the message states that "There is a problem with Google Authentication".
router.get('/login/google/failed', (req, res, next) => {
    res.json({ message: 'There is a problem with Google authentication.' });
});

//Lastly, GET to the path of /auth/google with passport authentication of the google route and providing a successRedirect to / AND a failureRedirect to /login/local/failed
router.get('/auth/google/admin', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login/google/failed'
}));

router.get('/login/google/failed', (req, res) => {
    res.status(500).json({
      message: 'There is a problem with Google Authentication'
    });
  });

  router.get('/auth/google', passport.authenticate('google', {
    successRedirect: '/', 
    failureRedirect: '/login/local/failed'
  }));

router.get('/logout', authController.logoutRequest);

router.post('/register', authController.register);

// github strategy
//Direction: we'll need to implement three different routes here to get our GitHub Strategy.
//GET to the path of /login/github and a second parameter that allows passport to authenticate a string of github
router.get('/login/github', passport.authenticate('github'));

//GET to the path of /login/github/failed with a callback that has a res.status.json where the message states that "There is a problem with Github Authentication".
router.get('/login/github/failed', (req, res, next) => {
  res.json({ message: 'There is a problem with GitHub authentication.' });
});

//Lastly, GET to the path of /auth/github with passport authentication of the github route and providing a successRedirect to / AND a failureRedirect to /login/github/failed
router.get('/auth/github', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login/github/failed'
}));

// POST to path of /login/local with passport auth of locl rout, callback with a res.status.json where status & statuscodes are 200 - json object "User logged in" data object request username, firstName, lastName

router.post('/login/local', passport.authenticate('local', { 
    failureRedirect: '/login/local/failed' 
  }), (req, res, next) => {
    res.status(200).json({
      status: 'success',
      statusCodes: 200,
      message: 'User logged in',
      data: {
        username: req.user.username, firstName: req.user.firstName, lastName: req.user.lastName,
      }
    });
  });

module.exports = router;