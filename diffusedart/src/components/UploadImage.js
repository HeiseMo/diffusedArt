import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from "react";
import axios from "axios";
import React, { useState } from "react";

function UploadImage() {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    console.log("uploading");
    axios
      .post("http://localhost:4000/image-upload", image)
      .then((res) => {
        console.log(res, "this is the response");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFileInformation = (event) => {
    // this function is called when the user selects a file
    const formData = new FormData();
    console.log(event.target.files[0]);
    formData.append(
      "myImage",
      event.target.files[0],
      event.target.files[0].name
    );
    console.log(formData);
    setImage(formData);
  };

  const handleClick = () => {
    console.log("clicked");
    axios.get("http://localhost:4000/api/auth/discord/redirect").then((res) => {
      console.log(res.data);
      setAccessToken(res.data.access_token);
      setTokenType(res.data.token_type);
    });
		const fragment = new URLSearchParams(window.location.hash.slice(1));
		const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

		if (!accessToken) {
			//return (document.getElementsByClassName('info').style.display = 'block');
      console.log("no access token");
		}
  };
  return (
    <div>
      <div>
        <div>
          <input type="file" name="myImage" onChange={getFileInformation} />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <button onClick={handleClick}>Identify yourself</button>
        <a id='login-link' href='https://discord.com/api/oauth2/authorize?client_id=1033867324907864105&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fredirect&response_type=code&scope=identify'>Login with Discord</a>
        <p className="info"></p>
      </div>
    </div>
  );
}
export default UploadImage;
