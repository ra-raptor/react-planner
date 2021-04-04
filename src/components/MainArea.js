import React from "react";
import wrapstyle from "../styles/wrapper.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function MainArea(props) {
  let display_now = true;
  let active_theme_id;
  let active_theme;
  try {
    active_theme_id = props.folders.filter(
      (folder) => folder.id === props.active
    )[0].theme;
    active_theme = props.theme.filter(
      (theme) => theme.id === active_theme_id
    )[0];
  } catch {
    display_now = false;
  }
  if (display_now === true) {
    // console.log(active_theme);
  }
  const taskStyle = {
    color: active_theme?.fg,
    background: active_theme?.bg,
  };
  const button_style = {
    // border: "1px solid #20283E",
    borderColor: active_theme?.fg,
    color: active_theme?.fg,
  };
  let filter_folder = (item) => item.folder === props.active;
  let items_to_display = props.data.filter((item) => filter_folder(item));
  // console.log(items_to_display.length);
  // console.log(props.active);

  // console.log(items_to_display);

  let item_builder = (item) => {
    return (
      <div style={taskStyle} key={item.id} className={wrapstyle.main_item}>
        <div className={wrapstyle["main_item-title"]}>
          <h3>{item.title}</h3>
        </div>
        <p>{item.content}</p>
        <div className={wrapstyle["main_item-buttons"]}>
          <button style={button_style}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button onClick={() => props.delTask(item.id)} style={button_style}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    );
  };

  let no_folder_selected = (
    <div className={wrapstyle.not_selected_item}>
      <div className={wrapstyle["main_item-title"]}>
        <h3 className={wrapstyle["not_selected"]}>Welcome to planX</h3>
      </div>
      <p>
        Select a folder from the folders tab to view the tasks present in that
        folder
      </p>
      <p>
        Create a new folder or delete an existing folder from the folders tab
      </p>
      <p>Use the theme tab to update the theme for the selected folder</p>
      <p>add a new custom theme from the theme tab</p>
      <p>
        Add a new task, update or delete an existing task from the main area
      </p>
    </div>
  );

  return (
    <div className={wrapstyle.main_area}>
      <div className={wrapstyle["main_item-head"]}>Tasks</div>
      <div className={wrapstyle.main_container}>
        {items_to_display.length > 0
          ? items_to_display.map((task) => item_builder(task))
          : no_folder_selected}
      </div>
    </div>
  );
}

export default MainArea;
