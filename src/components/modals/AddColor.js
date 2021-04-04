import React, { Component } from "react";
import ReactDom from "react-dom";
import modalStyle from "../../styles/modals.module.css";

class AddColor extends Component {
  render() {
    return ReactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={modalStyle.title}>Add Colour</h1>
          <button onClick={() => this.props.changeModal()}>Close</button>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default AddColor;
