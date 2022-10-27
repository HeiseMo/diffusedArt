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
  }

  getImages = () => {
    axios
      .get("/images")
      .then((response) => {
        const data = response.data;
        this.setState({ images: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  render() {
    let data = this.props.searchValue;

    return (
      <div className="img-list">
        {this.state.images.filter((item) => {
          
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
