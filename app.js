require("dotenv").config(); 
require("./config/connection"); 
require("./config/authStrategy"); 
//packages
const express = require("express");
//middleware
const morgan = require("morgan");
const path = require("node:path");
//init the app & port
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors"); 
const helmet = require("helmet"); 
const session = require("express-session"); 
const passport = require("passport"); 

app.use(morgan("dev"));

const songRoutes = require('./routes/songRouter');
const artistRoutes = require('./routes/artistRouter');
const siteRoutes = require('./routes/siteRouter'); 
const authRoutes = require('./routes/adminRouter');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); 
app.use(passport.session()); 

// app.get("/", (request, response, next) => {
//   response.status(200).json({success: {message: "This route points to the Home page"}, statusCode: 200});
// });

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>BumbleBeat</title>
      <link rel="stylesheet" href="/public/styles/style.css" />
      <script
        src="https://kit.fontawesome.com/012a2bcae9.js"
        crossorigin="anonymous"></script>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
      </style>
    </head>
    <body>
      <nav>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <input type="text" placeholder="Search..">
          </li>
          <li>
            <a href="playlists/">Playlists</a>
          </li>
          <li>
            <a href="music/">Music</a>
          </li>
          <li>
            <a href="settings.html">Account Settings</a>
          </li>
          <li>
            <a href="login.html">Login</a> or <a href="register.html">Register</a>
          </li>
        </ul>
      </nav>
  
      <main class="index-main">
        <div class="row">
          <div class="column1">
            <div
              class="currently-playing"
              style="background-image: url(public/images/pexels-spring-toan-3704041.jpg);
                background-size: cover;"></div>
            <div class="progress">
              <div class="barOverflow">
                <div class="bar"></div>
              </div>
            </div>
            <div class="time">
              <span class="elapsed-time">2:24</span> /
              <span class="track-time">3:10</span>
            </div>
          </div>
          <div class="column2">
            <div class="current-artist">
              <h1>Wendy Wu<i class="fa-solid fa-user-plus"></i></h1>
            </div>
            <div class="current-title">
              <h2>Next to You</h2>
            </div>
            <div class="playing-song-title">
              Elevator
              <i class="fa-regular fa-heart"></i>
              <i class="fa-solid fa-download"></i>
            </div>
            <div class="soundwave">
              <!-- <img src="public/images/yellow-soundwave.gif" /> -->
            </div>
          </div>
        </div>
        <div class="playback-row">
          <div class="volume-settings">
            <div class="volume-down">
              <i class="fa-solid fa-volume-xmark"></i>&nbsp;&nbsp;&nbsp;
            </div>
  
            <div class="volume-bar">
              <div class="volume-level"></div>
            </div>
  
            <div class="volume-control">
              <input type="range" min="0" max="100" value="50" step="1" />
            </div>
            <div class="volume-up">
              &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-volume-high"></i>
            </div>
            </div>
            <div class="playback-settings">
              <i class="fa-solid fa-backward-step"></i>
              <span id="gold"><i class="fa-solid fa-circle-play"></i></span>&nbsp;
              <i class="fa-solid fa-forward-step"></i>
            </div>
  
            <div class="track-setting">
              <i class="fa-solid fa-share-nodes"></i><i class="fa-solid fa-repeat"></i><i class="fa-solid fa-shuffle"></i><i class="fa-solid fa-circle-plus"></i>
            </div>
          </div>
        </div>
      </main>
  
      <footer>
        <div class="footer"><h3>Social Media</h3>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <div class="footer">Site Navigation
          <br />
          <a href="register.html">Register</a>
        </div>
        <div class="footer">Site Links 2</div>
        <div class="footer"><img src="public/images/bumblebeat-logo.png"></div>
      </footer>
    </body>
    </html>`
  ;

  res.send(html);
});




app.use(songRoutes);
app.use(artistRoutes);
app.use(siteRoutes); 
app.use(authRoutes); 


//server
app.listen(PORT, () => {
  console.log(`Bumblebeat's server is currently listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}/`)
});