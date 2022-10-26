import React from "react";
import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import AuthService from '../components/auth/auth-service';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchValue: null };
  }
    render() {
        const getSearchValue = (e) => {
            this.setState({ searchValue: e });
          };
      return (
        <div>
          <Navbar logoutUser={this.props.logoutUser} login={this.props.login} user={this.props.user}/>
            <SearchBar login={this.props.login} user={this.props.user} getSearchValue={getSearchValue}/>
            <ImageList searchValue={this.state.searchValue} />
      </div>
      );
    }
  }
  