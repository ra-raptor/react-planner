import React, { Component } from "react";
import wrapstyle from "../styles/wrapper.module.css";
import MainArea from "./MainArea";
import SidebarColor from "./SidebarColor";
import SidebarFolder from "./SidebarFolder";

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFolder: 0,
      totalFolders: 1,
      tasks: [
        {
          id: 0,
          folder: 0,
          title: "vfLorem ipsum dolor sit amet consectetur adipisicing.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 1,
          folder: 1,
          title: "2 Lorem ipsum dolor sit amet consectetur adipisicing.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          folder: 2,
          title: "3 Lorem ipsum dolor sit amet consectetur adipisicing.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      folders: [
        {
          id: 0,
          title: "Test",
          theme: 0,
        },
      ],
      themes: [
        {
          id: 0,
          fg: "#fff",
          bg: "#000",
        },
        {
          id: 1,
          fg: "#fff",
          bg: "#f00",
        },
        {
          id: 2,
          fg: "#000",
          bg: "#ff0",
        },
        {
          id: 3,
          fg: "#fff",
          bg: "#f0f",
        },
        {
          id: 4,
          fg: "#f0f",
          bg: "#0f0",
        },
      ],
      colorModalDisplay: false,
      folderModalDisplay: false,
      addTaskModalDisplay: false,
      editTaskModalDisplay: false,
    };
  }
  setActive = (id) => {
    this.setState({
      activeFolder: id,
    });
  };

  setColorModal = () => {
    let isTrue = this.state.colorModalDisplay;
    this.setState({
      colorModalDisplay: !isTrue,
    });
  };

  addFolderModal = () => {
    this.setState({
      folderModalDisplay: !this.state.folderModalDisplay,
    });
  };

  remove_task = (id) => {
    let x = window.confirm("Are you sure, you want to delete this task?");
    if (x) {
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((item) => item.id !== id),
      }));
    }
  };

  remove_task_without_confirmation = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((item) => item.id !== id),
    }));
  };

  updateTheme = (id) => {
    let curr = this.state.folders.findIndex(
      (ele) => ele.id === this.state.activeFolder
    );
    let newFolder = [...this.state.folders];
    if (
      this.state.activeFolder !== undefined &&
      newFolder[curr] !== undefined
    ) {
      newFolder[curr].theme = id;
    }
    this.setState({
      folders: newFolder,
    });
  };

  deleteFolder = (id) => {
    let x = window.confirm("Are you sure, you want to delete this folder?");
    if (x) {
      let tasks = this.state.tasks.filter((item) => item.folder === id);
      let id_list = [];
      tasks.forEach((i) => {
        id_list.push(i.id);
      });
      id_list.forEach((idl) => {
        this.remove_task_without_confirmation(idl);
      });

      this.setState((prevState) => ({
        folders: prevState.folders.filter((item) => item.id !== id),
      }));
      this.setState({
        activeFolder: null,
      });
    }
  };

  addFolder = (text) => {
    let newID = this.state.totalFolders;
    let newFolder = {
      id: newID,
      title: text,
      theme: 0,
    };
    let folders = this.state.folders;
    folders.push(newFolder);
    this.setState({
      folders: folders,
      totalFolders: newID + 1,
    });
  };

  render() {
    return (
      <div className={wrapstyle.wrapper}>
        <MainArea
          data={this.state.tasks}
          active={this.state.activeFolder}
          theme={this.state.themes}
          folders={this.state.folders}
          delTask={this.remove_task}
        />
        <SidebarFolder
          data={this.state.folders}
          active={this.state.activeFolder}
          theme={this.state.themes}
          changeFolder={this.setActive}
          delFolder={this.deleteFolder}
          showModal={this.state.folderModalDisplay}
          toggleModal={this.addFolderModal}
          addFolder={this.addFolder}
        />
        <SidebarColor
          update={this.updateTheme}
          active={this.state.activeFolder}
          data={this.state.themes}
          folders={this.state.folders}
          showModal={this.state.colorModalDisplay}
          changeModal={this.setColorModal}
        />
      </div>
    );
  }
}

export default Wrapper;
