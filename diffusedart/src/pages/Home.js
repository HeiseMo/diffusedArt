import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { renderMatches } from "react-router-dom";
import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";
import UploadImage from "../components/UploadImage";

export default class Home extends React.Component {
    state = {
      searchValue: null,
    };
  
    render() {
        const getSearchValue = (e) => {
            this.setState({ searchValue: e });
          };
      return (
        <div>
            <UploadImage />
            <SearchBar getSearchValue={getSearchValue}/>
            <ImageList searchValue={this.state.searchValue} />
      </div>
      );
    }
  }
  