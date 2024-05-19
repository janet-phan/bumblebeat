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
            response.status(400).json({
                error: { message: "Username already exists" },
                statusCode: 400,
            });
        }
    });
    response.status(500).json({
        error: { message: "Internal server error." },
        statusCode: 500,
    });
    
};


const login = async (request, response, next) => {
    console.log(request.user);
    response.status(200).json({
        success: { message: "User logged in." },
        data: {
            username: request.user.username,
        }, 
        statusCode: 200,
    });
};

const logout = async (request, response, next) => {
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

module.exports = { loginLocalFailed, register, login, logout };