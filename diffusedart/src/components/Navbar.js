import React from "react";
import AuthService from './auth/auth-service';
import loginIMG from '../discord-logo-black-login.png';
import logoutIMG from '../discord-logo-black-logout.png';


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    const handleClick = () => {
      window.location.href =
        "https://discord.com/api/oauth2/authorize?client_id=1033867324907864105&redirect_uri=http%3A%2F%2Fdiffusedhermit.com%2Fapi%2Fauth%2Fredirect&response_type=code&scope=identify";
      };
    return (
      <div className="nav-box">
      <div className="navbar-main">
        <div className="navbar-left">{this.props.login ? <div className="username-area"><p>{this.props.user.username}</p></div> : null}</div>
        <div className="navbar-right">{this.props.login ? <button className="auth-button" id="logout-link" onClick={this.props.logoutUser}><img src={logoutIMG} /></button> : <button className="auth-button" id="login-link" onClick={handleClick}><img src={loginIMG}/></button>}</div>
      </div>
      </div>
    );
  }
}
