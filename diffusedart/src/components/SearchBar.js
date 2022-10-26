import React from "react";
import UploadImage from "../components/UploadImage";
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setImageInput: "",
      loggedInUser: null,
      login: null
    };
  }
//  this.setState({ loggedInUser: this.props.user, login: this.props.login });
  
  render() {
    
    const handleChange = async (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      await this.setState({ [name]: value });
      this.props.getSearchValue(this.state.setImageInput);
    };
    return (
      <div className="search">
        <div className="logoArea">
          <h1>Diffused Art</h1>
        </div>
        {this.props.login ? <UploadImage /> : null}
        <div className="searchArea">
            <input
              type="text"
              id="search"
              className="search-input"
              placeholder="Explore some dreams"
              name="setImageInput"
              value={this.imageInput}
              onChange={handleChange}
            />
        </div>
      </div>
    );
  }
}
