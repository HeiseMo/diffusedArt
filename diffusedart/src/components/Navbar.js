import React from "react";
import AuthService from './auth/auth-service';


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
      <div className="navbar-main">
        <div className="navbar-left">{this.props.login ? <p>{this.props.user.username}</p> : null}</div>
        <div className="navbar-right">{this.props.login ? <button id="logout-link" onClick={this.props.logoutUser}>Logout</button> : <button id="login-link" onClick={handleClick}>Login with Discord</button>}</div>
      </div>
    );
  }
}
