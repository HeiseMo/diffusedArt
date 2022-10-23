
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from "react";
import axios from "axios";
import React, { useState } from "react";

  function UploadImage() {
  const[image, setImage] = useState(null);
  const handleUpload = () => {
    console.log("uploading");
    axios.post("http://localhost:4000/image-upload", image).then((res) => {
      console.log(res, "this is the response");
    } ).catch((err) => {
      console.log(err);
    });
  }
  const getFileInformation = (event) => { // this function is called when the user selects a file
    const formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("myImage", event.target.files[0], event.target.files[0].name);
    console.log(formData)
    setImage(formData);
  }
    return (
      <div>
        <div>
          <div>
            <input type="file" name="myImage" onChange={getFileInformation}/>
            <button type="button" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    );
}
export default UploadImage;