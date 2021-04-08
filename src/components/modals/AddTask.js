import React, { Component } from "react";
import modalStyle from "../../styles/modals.module.css";
import reactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }

  handleTitleInput = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleBodyInput = (event) => {
    this.setState({
      body: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let isEmpty = this.state.title === "" || this.state.body === "";
    if (!isEmpty) {
      console.log(this.state.title, this.state.body, this.props.folderId);
      this.props.addTask(
        this.props.folderId,
        this.state.title,
        this.state.body
      );
      this.props.toggleAddTask();
    }
  };

  render() {
    return reactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={`${modalStyle.title} ${modalStyle.addTaskTitle}`}>
            Create New Card ( {this.props.title} )
          </h1>
          <form className={modalStyle.addTaskForm} onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleTitleInput}
              type="text"
              autoFocus
              placeholder="Enter Card Title"
              required
            />
            <textarea
              onChange={this.handleBodyInput}
              cols="30"
              rows="10"
              placeholder="Description of the heading goes here...."
              required
            ></textarea>
            <input onClick={this.handleSubmit} type="submit" value="Done" />
          </form>
          <div
            className={modalStyle.close}
            onClick={() => this.props.toggleAddTask()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default AddTask;
