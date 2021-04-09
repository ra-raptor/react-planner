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
      recentlyDeleted: -1,
      totalFolders: 1,
      totalThemes: 5,
      totalTasks: 3,
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
          fg: "#000",
          bg: "#fff",
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
      taskToEdit: -1,
    };
  }
  setActive = (id) => {
    this.setState({
      activeFolder: id,
    });
  };

  // toggles the modal to add colour themes
  setColorModal = () => {
    let isTrue = this.state.colorModalDisplay;
    this.setState({
      colorModalDisplay: !isTrue,
    });
  };

  //toggles the modal to add new Folders
  addFolderModal = () => {
    this.setState({
      folderModalDisplay: !this.state.folderModalDisplay,
    });
  };

  //toggles the add Task(Card) modal
  addTaskModal = () => {
    this.setState({ addTaskModalDisplay: !this.state.addTaskModalDisplay });
  };

  //toggles the edit Task(Card) modal
  editTaskModal = () => {
    this.setState({
      editTaskModalDisplay: !this.state.editTaskModalDisplay,
    });
  };

  //removes task with a confirm alert
  remove_task = (id) => {
    let x = window.confirm("Are you sure, you want to delete this task?");
    if (x) {
      this.setState((prevState) => ({
        //filters for everytask that is not with the given "id"
        tasks: prevState.tasks.filter((item) => item?.id !== id),
      }));
    }
  };

  //removes the task without confiration (for clearing tasks of deleted folder)
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
        recentlyDeleted: id,
      }));
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

  addTheme = (fg, bg) => {
    let newID = this.state.totalThemes;
    let newTheme = {
      id: newID,
      fg: fg,
      bg: bg,
    };
    let themes = this.state.themes;
    themes.push(newTheme);
    this.setState({
      themes: themes,
      totalThemes: newID + 1,
    });
  };

  addTask = (folder, title, body) => {
    let newID = this.state.totalTasks;
    let newTask = {
      id: newID,
      folder: folder,
      title: title,
      content: body,
    };
    let tasks = this.state.tasks;
    tasks.push(newTask);
    this.setState({
      tasks: tasks,
      totalTasks: newID + 1,
    });
  };

  setTaskToEdit = (id) => {
    this.setState({
      taskToEdit: id,
    });
  };

  updateTask = (id, title, content) => {
    const newList = this.state.tasks.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          title: title,
          content: content,
        };
      }
      return item;
    });
    this.setState({
      tasks: newList,
    });
  };

  render() {
    return (
      <div className={wrapstyle.wrapper}>
        <MainArea
          recentlyDeleted={this.state.recentlyDeleted}
          data={this.state.tasks}
          active={this.state.activeFolder}
          theme={this.state.themes}
          folders={this.state.folders}
          delTask={this.remove_task}
          showAddTask={this.state.addTaskModalDisplay}
          toggleAddTask={this.addTaskModal}
          showEditTask={this.state.editTaskModalDisplay}
          toggleEditTask={this.editTaskModal}
          addTask={this.addTask}
          taskToEdit={this.state.taskToEdit}
          setTaskToEdit={this.setTaskToEdit}
          updateTask={this.updateTask}
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
          addTheme={this.addTheme}
        />
      </div>
    );
  }
}

export default Wrapper;
