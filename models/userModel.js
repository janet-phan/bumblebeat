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
    password: {
        type: Buffer
    },
    salt: {
        type: Buffer
    },
    strategy: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;