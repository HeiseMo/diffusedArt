import React from "react";
import "./../Modal.css";

export default class imageCard extends React.Component {
  state = {
    modal: false,
  };
  toggleModal = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };
  render() {
    if (this.state.modal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return (
      <div onClick={this.toggleModal} className="img-container">
        <img className="img-box" src={this.props.location}></img>
        {this.state.modal && (
          <div className="modal">
            <div onClick={this.toggleModal} className="overlay"></div>
            <div className="modal-content">
              <img className="img-modal" src={this.props.location}></img>
              <div className="modal-info">
                <div className="modal-prompts">
                  <fieldset>
                    <legend>Prompt</legend>
                    <p className="modal-prompt">{this.props.prompt}</p>
                  </fieldset>
                  <fieldset>
                    <legend>Negative Prompt</legend>
                    <p className="modal-prompt">{this.props.negativePrompt}</p>
                  </fieldset>
                </div>
                <div className="modal-small-info">
                  <fieldset>
                    <legend>Steps</legend>
                    <p className="modal-prompt">{this.props.steps}</p>
                  </fieldset>
                  <fieldset>
                    <legend>CFG</legend>
                    <p className="modal-prompt">{this.props.cfg}</p>
                  </fieldset>
                  <fieldset>
                    <legend>Dimensions</legend>
                    <p className="modal-prompt">{this.props.size}</p>
                  </fieldset>
                  <fieldset>
                    <legend>Sampler</legend>
                    <p className="modal-prompt">{this.props.sampler}</p>
                  </fieldset>
                  <fieldset>
                    <legend>Seed</legend>
                    <p className="modal-prompt">{this.props.seed}</p>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
