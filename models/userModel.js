const mongoose = require("mongoose");
const passport = require("passport"); 

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    strategy: {
        type: String,
    },
    googleId: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;