import React, { Component } from "react";
import reactDom from "react-dom";
import modalStyle from "../../styles/modals.module.css";
import { faCheck, faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddFolder extends Component {
  render() {
    return reactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={modalStyle.title}>Add Folder</h1>
          <input type="text" placeholder="Enter folder name" />
          <button>ADD</button>
          <div onClick={() => this.props.toggleModal()}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default AddFolder;
