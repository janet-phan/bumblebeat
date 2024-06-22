const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (request, response, next) => {
    const { firstName, lastName, username, password } = request.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
            return next(error);
        }
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            googleId: "" // added
        });
        try {
            await newUser.save();
            request.login(newUser, (err) => {
                response.status(201).json({
                    success: { message: "New user is created" },
                    data: { firstName, lastName, username },
                    statusCode: 201,
                });
            });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.username) {
                response.status(400).json({
                  error: { message: "Username already exists" },
                  statusCode: 400,
                });
            } else {
                response.status(400).json({
                  error: { message: "Something went wrong while signing up!" },
                  statusCode: 400,
                });
            }
        }
    });
    response.status(500).json({
        error: { message: "Internal server error." },
        statusCode: 500,
    });
    
};


const adminLogin = (request, response, next) => {
    try {
      response.status(200).json({
        success: `You're logged in as admin!`,
        statusCode: 200,
      });
    } catch (error) {
      response
        .status(400)
        .json({ error: "Failed logging in as admin :(", statusCode: 400 });
    }
  };
  
const adminLogout = async (request, response, next) => {
    request.logout((error) => {
        if (error) {
            response.status(400).json({
                error: { message: "Something went wrong when logging out" },
                statusCode: 400,
            });
        } else {
            response.json("Successfully logged out");
        }
    });
};

const loginLocalFailed = (req, res, next) => {
    res.status(401).json({
        error: {
            message: "Username or password is incorrect.",
            statusCode: 401,
        }
    });
};


  
const newSong = new Song({
    title: title,
    artist: artist,
    album: album,
    time: time,
});

    

module.exports = { loginLocalFailed, register, adminLogin, adminLogout, editArtist, deleteArtist, newSong };