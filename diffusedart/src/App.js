import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import DiscordOauth2 from "discord-oauth2";
// import pages
import Home from "./pages/Home";
import Error from "./pages/error";
import axios from "axios";
import './App.css';
import AuthService from "./components/auth/auth-service";


//import Navbar from "./components/Navbar";
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  fetchUser(){
    console.log("I got into function")
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        console.log(err)
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
 
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    return (
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/:Id"/>
          <Route path="/auth"></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
    );
  }
}
