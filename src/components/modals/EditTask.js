import React, { Component } from "react";

import modalStyle from "../../styles/modals.module.css";
import reactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export class EditTask extends Component {
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

  componentDidMount() {
    this.setState({
      title: this.props.taskContent.title,
      body: this.props.taskContent.content,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let isEmpty = this.state.title === "" || this.state.body === "";
    if (!isEmpty) {
      this.props.updateTask(
        this.props.taskToEdit,
        this.state.title,
        this.state.body
      );
      this.props.toggleEditTask();
    }
  };

  render() {
    return reactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={`${modalStyle.title} ${modalStyle.addTaskTitle}`}>
            Edit ( {this.props.folderName} )
          </h1>
          <form onSubmit={this.handleSubmit} className={modalStyle.addTaskForm}>
            <input
              onChange={this.handleTitleInput}
              type="text"
              autoFocus
              placeholder="Enter new title"
              required
              value={this.state.title}
            />
            <textarea
              onChange={this.handleBodyInput}
              cols="30"
              value={this.state.body}
              rows="10"
              placeholder="Enter new description of the heading...."
              required
            ></textarea>
            <input onClick={this.handleSubmit} type="submit" value="Done" />
          </form>
          <div
            className={modalStyle.close}
            onClick={() => this.props.toggleEditTask()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default EditTask;
