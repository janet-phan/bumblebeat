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

app.get("/", (request, response, next) => {
    const filePath = path.join(__dirname, 'index.html');
    response.sendFile(filePath);
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