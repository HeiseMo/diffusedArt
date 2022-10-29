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
        document.getElementById("myLabel").innerHTML = "Choose File";
        this.setState({ image: null });
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
    document.getElementById("myLabel").innerHTML = event.target.files[0].name;
    this.setState({ image: formData });
  };
  check = () => {
    alert("I am called")
  }
    render() {


      return (
        <div>
        <div className="form-area">
          <form>
          <div className="input-container">
            <div onClick={this.handleUpload} className="upload-button"><div>Upload</div></div>
          <label id="myLabel" className="custom-file-upload">
            <p>Choose File</p>
            <input id="myInput" type="file" name="myImage" onChange={this.getFileInformation} />
            </label>
          </div>
          </form>
        </div>
      </div>
      );
    }
  }
