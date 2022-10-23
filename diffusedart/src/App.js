import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import DiscordOauth2 from "discord-oauth2";
// import pages
import Home from "./pages/Home";
import Error from "./pages/error";
import './App.css';
//import Navbar from "./components/Navbar";
export default class App extends React.Component {
  state = {
    test: null,
  };
  render() {
    return (
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/:Id"/>
          
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
    );
  }
}
