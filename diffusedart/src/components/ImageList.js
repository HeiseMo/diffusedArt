import React from "react";
import ImageCard from "./imageCard";
import axios from "axios";
//import Loading from "./Loading";

export default class ImageList extends React.Component {
  state = {
    images: [],
    filterdImages: [],
  };

  componentDidMount() {
    this.getImages();
    console.log(this.state.images[0]);
  }

  getImages = () => {
    axios
      .get("http://localhost:4000/images")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ images: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  render() {
    let data = this.props.searchValue;
    let test = this.state.images;
    console.log(data, "data");

    return (
      <div className="img-list">
        {this.state.images.filter((item) => {
          
          let count = 0;
            if (data == null) {
              console.log("im empty")
              return item;
            }
            let arrData = data.split(" ");
            console.log(typeof data)
            for(let i = 0; i < arrData.length; i++) {
              if (item.prompt.toLowerCase().includes(arrData[i].toLowerCase())) {
                console.log(arrData[i], "im here")
                count += 1;
              }

            }
            if (count == arrData.length) {
            return item;
          }
          }).map((item) => {
            return <ImageCard key={item.id} {...item} />;
          })
        
        /*this.state.images.filter((item) => {
            if (data == null) {
              console.log("im empty")
              return item;
            } else if (item.prompt.toLowerCase().includes(data.toLowerCase())) {
              console.log("im not empty")
              return item;
            }
          }).map((item) => {
            return <ImageCard key={item.id} {...item} />;
          })*/}
      </div>
    );
  }
}
