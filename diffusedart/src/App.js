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
    this.state = { loggedInUser: null, login:false };
    this.service = new AuthService();
  }

  fetchUser(){
    console.log("I am called")
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response,
          login: true

        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false,
          login: false
        }) 
      })
    }
  }
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj,
    })
  }
  logoutUser = () => {
    console.log("I got to frontend func logout")
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null, login: false });
    })
  };
  componentDidMount(){
    this.fetchUser();
  }
  render() {
//this.fetchUser()
    return (
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home logoutUser={this.logoutUser} getUser={this.getTheUser} login={this.state.login} user={this.state.loggedInUser}/>} />
          <Route path="/image/:Id"/>
          <Route path="/auth"></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
    );
  }
}
