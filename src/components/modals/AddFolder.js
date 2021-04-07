import React, { Component } from "react";
import reactDom from "react-dom";
import modalStyle from "../../styles/modals.module.css";
import { faCheck, faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
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

  handleSubmit = () => {
    if(this.state.text !== ""){
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
          <div className={modalStyle.input_folder}>
            <input
              onChange={this.handleInput}
              type="text"
              placeholder="Enter folder name"
            />
            <button onClick={this.handleSubmit}>ADD</button>
          </div>

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
