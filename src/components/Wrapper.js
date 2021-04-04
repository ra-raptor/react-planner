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
          folder: 0,
          title: "2 Lorem ipsum dolor sit amet consectetur adipisicing.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          folder: 1,
          title: "3 Lorem ipsum dolor sit amet consectetur adipisicing.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      folders: [
        {
          id: 0,
          title: "College",
          theme: 1,
        },
        {
          id: 1,
          title: "School",
          theme: 2,
        },
        {
          id: 3,
          title: "School",
          theme: 3,
        },
        {
          id: 2,
          title: "School",
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

  remove_task = (id) => {
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
    let tasks = this.state.tasks.filter((item) => item.folder === id);
    let id_list = [];
    tasks.forEach((i) => {
      id_list.push(i.id);
    });
    id_list.forEach((idl) => {
      this.remove_task(idl);
    });

    this.setState((prevState) => ({
      folders: prevState.folders.filter((item) => item.id !== id),
    }));
    this.setState({
      activeFolder: null,
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
