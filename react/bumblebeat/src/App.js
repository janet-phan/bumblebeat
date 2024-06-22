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
