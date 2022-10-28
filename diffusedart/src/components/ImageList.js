import React from "react";
import ImageCard from "./imageCard";
import axios from "axios";
//import Loading from "./Loading";

export default class ImageList extends React.Component {
  state = {
    images: [],
    filterdImages: [],
  };
/*
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
  */
  render() {
    let data = this.props.searchValue;

    return (
      <div className="img-list">
        {this.props.images.filter((item) => {
          console.log(item)
          let count = 0;
            if (data == null) {
              return item;
            }
            let arrData = data.split(" ");
            for(let i = 0; i < arrData.length; i++) {
              if (item.prompt.toLowerCase().includes(arrData[i].toLowerCase())) {
                count += 1;
              }

            }
            if (count == arrData.length) {
            return item;
          }
          }).map((item) => {
            return <ImageCard key={item._id} {...item} />;
          })}
      </div>
    );
  }
}
