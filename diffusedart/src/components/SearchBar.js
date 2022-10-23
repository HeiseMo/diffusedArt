import React, { Component } from "react";
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setImageInput: "",
    };
  }
  render() {
    const handleChange = async (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      await this.setState({ [name]: value });
      this.props.getSearchValue(this.state.setImageInput);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };
    return (
      <div className="search">
        <div className="logoArea">
          <h1>Diffused Art</h1>
        </div>
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
