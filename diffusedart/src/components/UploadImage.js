import React, { useState } from "react";
import axios from "axios";
import { renderMatches } from "react-router-dom";

export default class UploadImage extends React.Component {
  constructor(props){
    super(props);
    this.state = { image: null };
  }
  handleUpload = (e) => {
    console.log("uploading");
    e.preventDefault();
    axios
      .post("/api/image-upload", this.state.image)
      .then((res) => {
        console.log(res, "this is the response");
        this.props.handleRefreshImages(res.data);
        return res
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getFileInformation = (event) => {
    // this function is called when the user selects a file
    const formData = new FormData();
    formData.append(
      "myImage",
      event.target.files[0],
      event.target.files[0].name
    );
    console.log(formData);
    this.setState({ image: formData });
  };

    render() {


      return (
        <div>
        <div>
          <form>
          <div className="input_container">
          <button onClick={this.handleUpload}>Upload</button>
            <input id="myInput" type="file" name="myImage" onChange={this.getFileInformation} />
            
          </div>
          </form>
        </div>
      </div>
      );
    }
  }
