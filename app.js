require("dotenv").config();
require("./react/bumblebeat/src/config/connection");
require("./react/bumblebeat/src/config/authStrategy");
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

const songRoutes = require("./react/bumblebeat/src/routes/songRouter");
const artistRoutes = require("./react/bumblebeat/src/routes/artistRouter");
const siteRoutes = require("./react/bumblebeat/src/routes/siteRouter");
const authRoutes = require("./react/bumblebeat/src/routes/adminRouter");

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
  response.send();
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
