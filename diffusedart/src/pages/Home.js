import React from "react";
import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchValue: null, images: [] };
  }
  getImages = () => {
    axios
      .get("/api/images")
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        this.setState({ images: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getImages();
  }
    render() {
        const getSearchValue = (e) => {
            this.setState({ searchValue: e });
          };
          const handleRefreshImages = (a) => {
            this.getImages()
          }
      return (
        <div className="home">
          <Navbar logoutUser={this.props.logoutUser} login={this.props.login} user={this.props.user}/>
            <SearchBar handleRefreshImages={handleRefreshImages} login={this.props.login} user={this.props.user} getSearchValue={getSearchValue}/>
            <ImageList searchValue={this.state.searchValue} images={this.state.images}/>
      </div>
      );
    }
  }
  