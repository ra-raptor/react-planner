import React, { Component } from "react";
import reactDom from "react-dom";
import modalStyle from "../../styles/modals.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text !== "") {
      this.props.addFolder(this.state.text);
      this.props.toggleModal();
    }
  };

  render() {
    return reactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={modalStyle.title}>Add Folder</h1>
          <form
            className={modalStyle.input_folder}
            onSubmit={this.handleSubmit}
          >
            <input
              required
              autoFocus
              onChange={this.handleInput}
              type="text"
              placeholder="Enter folder name"
            />
            <input onClick={this.handleSubmit} type="submit" value="ADD" />
            {/* <button onClick={this.handleSubmit}>ADD</button> */}
          </form>

          <div
            className={modalStyle.close}
            onClick={() => this.props.toggleModal()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default AddFolder;
