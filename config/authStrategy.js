const passport = require("passport"); 
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

//Define the github strategy
const GithubStrategy = require('passport-github').Strategy;

//Define google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/userModel");

// passport.use(
//     new LocalStrategy(
//         (verify = (username, password, done) => {
//         User.findOne({ username: username })
//         .then((user) => {

//             //user not validated
//             if (!user) {
//             return done(null, false, { message: "User not found" });
//             }
//             // user validated, compare to hashed/salted
//             bcrypt.compare(password, user.password, (error, result) => {
            
//             if (error) {
//                 return done(error);
//             }
//             return done(null, user);
//             });
//         })
//         .catch((error) => {
//             console.log(`There was an error finding user from the database: ${error}`);
//         });
//         })
//     )
// );

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
  
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          return done(null, false, { message: "Incorrect email or password." });
        }
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

//implement the github strategy
passport.use(new GithubStrategy({ //container to use the strategy
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    callbackURL: 'https://bumblebeat.onrender.com'
}, 
    (accessToken, refreshToken, profile, done) => { 
    console.log(profile); 
    return done(null, profile); 
    })
);
  
//implement the google strategy
passport.use(new GoogleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://bumblebeat.onrender.com/auth/google'
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(profile); 
        return done(null, profile); 
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});