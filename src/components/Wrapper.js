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
      totalTasks: 4,
      tasks: [
        {
          id: 0,
          folder: 0,
          title: "What is PlanX?",
          content:
            "PlanX is a simple card based todo-list type planning web app made with React Js. Users can organise cards into folders and can apply custom themes.",
        },
        {
          id: 1,
          folder: 0,
          title: "How to manage folders?",
          content:
            "Use the folders tab to select folders, delete folders and to create new folders. Click on the desired folder to open its content.",
        },
        {
          id: 2,
          folder: 0,
          title: "How to work with Cards?",
          content:
            "After selecting a folder, the cards in that folder will be displayed. Use the Edit button to edit the content of the card and the delete button to delete a card. new cards can be added by add card button.",
        },
        {
          id: 3,
          folder: 0,
          title: "How to create Themes?",
          content:
            "Select a theme from the theme tab. The theme will be applied to the selected folder. New themes can be also be created by choosing the background and foreground colour.",
        },
      ],
      folders: [
        {
          id: 0,
          title: "Tutorial",
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
          fg: "#581818",
          bg: "#d8f0d6",
        },
        {
          id: 2,
          fg: "#250706",
          bg: "#d8eef0",
        },
        {
          id: 3,
          fg: "#d9d6f0",
          bg: "#197d88",
        },
        {
          id: 4,
          fg: "#ffffff",
          bg: "#b2413a",
        },
      ],
      colorModalDisplay: false,
      folderModalDisplay: false,
      addTaskModalDisplay: false,
      editTaskModalDisplay: false,
      taskToEdit: -1,
    };
  }

  componentDidMount() {
    let areFoldersPresent = true;
    let foldersInLocalStorage = localStorage.getItem("folders");
    let tasksInLocalStorage = localStorage.getItem("tasks");
    let activeFolderLocalSTorage = localStorage.getItem("activeFolder");
    // managing folders and activestate
    if (foldersInLocalStorage) {
      let folderList = JSON.parse(foldersInLocalStorage);
      // if length of folders in localstorage is greater than 0 check if the activefolder is present ? else make the first folder as active
      if (folderList.length > 0) {
        let firstFolder = folderList[0];
        if (activeFolderLocalSTorage) {
          let queryList = folderList.filter(
            (folder) => folder.id === parseInt(activeFolderLocalSTorage)
          );
          // if active folder is already present
          if (queryList.length > 0) {
            this.setState({
              activeFolder: parseInt(localStorage.getItem("activeFolder")),
            });
          } else {
            // else make the first folder active
            this.setState({
              activeFolder: firstFolder.id,
            });
          }
        }
      } else {
        // if no folders are present in localstorage
        // keep the folder / task / totalFolder / totalTask / activeFolder same as default
        areFoldersPresent = false;
        this.setState({
          activeFolder: 0,
        });
      }
    }

    //removing obselete tasks
    if (tasksInLocalStorage && foldersInLocalStorage && areFoldersPresent) {
      let taskList = JSON.parse(tasksInLocalStorage);
      let folderList = JSON.parse(foldersInLocalStorage);
      let IDlist = [];
      folderList.forEach((folder) => {
        IDlist.push(folder.id);
      });
      let newList = taskList.filter((task) => IDlist.includes(task.folder, 0));
      this.setState({
        tasks: newList,
      });
    }
    //totalThemes
    localStorage.getItem("totalThemes") &&
      this.setState({
        totalThemes: parseInt(localStorage.getItem("totalThemes")),
      });
    //totalFolders
    areFoldersPresent &&
      localStorage.getItem("totalFolders") &&
      this.setState({
        totalFolders: parseInt(localStorage.getItem("totalFolders")),
      });

    //totalTasks
    areFoldersPresent &&
      localStorage.getItem("totalTasks") &&
      this.setState({
        totalTasks: parseInt(localStorage.getItem("totalTasks")),
      });

    //folders
    areFoldersPresent &&
      localStorage.getItem("folders") &&
      this.setState({
        folders: JSON.parse(localStorage.getItem("folders")),
      });
    //themes
    localStorage.getItem("themes") &&
      this.setState({
        themes: JSON.parse(localStorage.getItem("themes")),
      });
  }

  setActive = (id) => {
    this.setState({
      activeFolder: id,
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    localStorage.setItem("activeFolder", id);
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
      let newTasks = this.state.tasks.filter((item) => item?.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  // TODO : localstorgae
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
    localStorage.setItem("folders", JSON.stringify(newFolder));
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

      let newFolder = this.state.folders.filter((item) => item.id !== id);
      localStorage.setItem("folders", JSON.stringify(newFolder));

      // let newTasks = this.state.tasks.filter((item) => item?.id !== id);
      // localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
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
    localStorage.setItem("folders", JSON.stringify(folders));
    localStorage.setItem("totalFolders", newID + 1);
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
    localStorage.setItem("themes", JSON.stringify(themes));
    localStorage.setItem("totalThemes", newID + 1);
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("totalTasks", newID + 1);
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
    localStorage.setItem("tasks", JSON.stringify(newList));
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
