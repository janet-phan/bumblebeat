const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (request, response, next) => {
  const { firstName, lastName, email, role, username, password } = request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      role,
      username,
      password: hashedPassword,
      googleId: "", // added
    });
    console.log(newUser);

    await newUser.save();
    request.login(newUser, (err) => {
      if (err) {
        return response.status(400).json({
          error: { message: "Something went wrong logging in" },
          statusCode: 400,
        });
      }
    });
    return response.status(201).json({
      success: { message: "New user is created" },
      data: { firstName, lastName, username, email, role },
      statusCode: 201,
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
    },
  });
};

module.exports = { loginLocalFailed, register, login, logout };
