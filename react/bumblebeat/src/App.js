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

const songRoutes = require("./src/routes/songRouter");
const artistRoutes = require("./src/routes/artistRouter");
const siteRoutes = require(".src/routes/siteRouter");
const authRoutes = require("./src/routes/adminRouter");

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


import './App.css';
// const connection = require('./config/connection');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Profile from "./components/Userprofile";
import Login from "./components/Login";
import Top  from "./components/Top";
import Header from './shared/Header';
import Footer from './shared/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/top" element={<Top />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
