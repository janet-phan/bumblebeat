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

const songRoutes = require("./routes/songRouter");
const artistRoutes = require("./routes/artistRouter");
const siteRoutes = require("./routes/siteRouter");
const authRoutes = require("./routes/adminRouter");

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

app.get("/", (request, response, next) => {
  //response.status(200).json({success: {message: "This route points to the Home page"}, statusCode: 200});
  //Add response.send with the template literal
  response.send(
    `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>BumbleBeat</title>
      <style>
      :root {
        --black: #2E2C2C;
        --darkblack: #1a1919;
        --yellow: #FFDE59;
        --gold: #F8A70E;
        --brown: #9B6941;
        --white: #F6F6E4;
        --lightgray: #7B7B7B;
    }
    
    .fredoka-normal {
        font-family: "Fredoka", sans-serif;
        font-optical-sizing: auto;
        font-weight: 100;
        font-style: normal;
        font-variation-settings:
          "wdth" 100;
      }
    
      body, html {
        height: 100%;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }
    
    body {
        background: linear-gradient(180deg, var(--gold) 0%, var(--black) 55%);
        color: var(--white);
        font-family: "Fredoka", sans-serif;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    
    body a {
        color: var(--white);
        text-decoration: none;
    }
    
    nav ul {
        display: flex;
        justify-content: space-around;
    }
    
    nav ul li {
        text-decoration: none;
        padding: 0 20px;
        margin-bottom: 2em;
        list-style-type: none;
    }
    
    nav input {
      width: 100%;
      padding: .5rem;
      border-radius: 20px;
    }
    
    footer {
        display: flex;
        justify-content: space-around;
        margin: 2em auto;
    }
    
    footer img {
      width: 200px;
      filter: drop-shadow(0 0 1.5rem var(--white));
    }
    
    main {
        width: 85%;
        margin: auto;
    }
    
    .row {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 2em;
    } 
    
    .column1 {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex: 2;     
    }
    
    .column2 {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex: 3;     
    }
    
    /* circular track playing */
    .currently-playing {
        border-radius: 50%;
        width: 20em;
        height: 20em;
        background-color: var(--yellow);
        box-shadow: 0 0 10px var(--yellow);
        position: absolute;
        background-image: url('../images/taylor_swift.webp');
        background-size: cover;
    }
    
    .current-artist {
        text-transform: lowercase;
        margin-top: 1em;
    }
    
    .current-artist h1 {
        color: var(--white);
        text-decoration: none;
        font-size: 2em;
        font-weight: 400;
        margin-bottom: 0;
    }
    
    .current-title h2 {
        color: var(--black);
        font-size: 1.5em;
        font-weight: 200;
        margin-top: 0;
    }
    
    i {
        margin-left: 0.45em;
        font-size: .75em;
    }
    
    .time {
        text-align: center;
        width: 20em;
        margin-top: 1em;
    }
    
    /* borrowed code from codepen for this rounded bar */
    .progress{
        /* margin: 100px auto; */
        /* text-align: center; */
        width: 45%;
        /* background: white; */
        transform: rotate(180deg);
        position: relative;
        margin-top: 10em;
        padding-left: 25em;
      }
      .barOverflow{ /* Wraps the rotating .bar */
        position: relative;
        overflow: hidden;
        width: 25em; height: 12em; /* Half circle (overflow) */
        /* background: blue; */
      }
      .bar{
        /* position: absolute; */
        margin: auto;
        width: 24em; height: 24em; 
        border-radius: 50%;
        box-sizing: border-box;
        border: 18px solid #FEBE6E;     
        border-left-color: #9B6941;
        border-bottom-color: #9B6941;
        transform: rotate(5deg);  /* (per * 1.8) - 45 */
      /* Exa: 50% - (50 * 1.8) - 45 = 45deg */
      /* background: pink; */
      }
      
      .playing-song-title {
        font-size: 3em;
      }
      
      .soundwave {
        height: 10em;
        background-image: url(../images/yellow-soundwave.gif);
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: -5em;
      }
    
      /* volume, playback, track share/repeat/shuffle/add to list icons */
      .playback-row {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 2em;
        justify-content: center;
        align-items: center;
    } 
    
      .volume-settings {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        margin-top: 2em;
        justify-content: center;
      }
    
       /* CSS for the volume bar */
       .volume-bar {
        width: 150px;
        height: 20px;
        background-color: var(--gold);
        border-radius: 10px;
        overflow: hidden;
      }
    
      .volume-level {
        height: 100%;
        background-color: var(--yellow);
      }
    
      /* CSS for the volume control slidey ball thingy */
      .volume-control {
        width: 150px;
        height: 40px;
        margin-left: -150px;
      }
    
      input[type="range"] {
        width: 100%;
        -webkit-appearance: none;
        background-color: transparent;
        margin: 0;
      }
    
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: var(--gold);
      }
    
      .playback-settings {
        font-size: 5em;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    
      #gold {
        color: var(--gold);
        font-size: 1.5em;
      }
    
      .track-setting {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: 2em;
      }
    
      .track-setting i {
        margin: .5em;
      }
    
      </style>
      <script src="https://kit.fontawesome.com/012a2bcae9.js"
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
            <a href="./playlists/index.html">Playlists</a>
          </li>
          <li>
            <a href="./music/index.html">Music</a>
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
            <div class="currently-playing">
            </div>
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
              <h1>Taylor Swift<i class="fa-solid fa-user-plus"></i></h1>
            </div>
            <div class="current-title">
              <a href="./music/albums/speak-now.html"><h2>Speak Now</h2></a>
            </div>
            <div class="playing-song-title">
              <a href="./music/albums/speak-now.html#long-live">Long Live</a>
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
        <div class="footer"><img src="./public/images/bumblebeat-logo.png"></div>
      </footer>
    </body>
    </html>
    `
  );
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
