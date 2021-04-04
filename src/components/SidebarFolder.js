import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import wrapstyle from "../styles/wrapper.module.css";
import AddFolder from "./modals/AddFolder";

let folderGenerator = (folder, theme, active, chfunc, dlfunc) => {
  const folderStyle = {
    color: theme.fg,
    background: theme.bg,
  };

  const editIcon = (
    <div>
      <FontAwesomeIcon icon={faCheck} />
    </div>
  );
  return (
    <div
      style={folderStyle}
      onClick={() => chfunc(folder.id)}
      className={wrapstyle.folder_item}
      key={folder.id}
    >
      <h3>{folder.title}</h3>
      <div className={wrapstyle["folder_item-btns"]}>
        {active ? editIcon : ""}
        <div onClick={() => dlfunc(folder.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
    </div>
  );
};

function SidebarFolder(props) {
  let modal = props.showModal ? (
    <AddFolder toggleModal={props.toggleModal} />
  ) : null;
  // console.log(props.theme);
  return (
    <div className={wrapstyle.sidebar_folder}>
      Folders
      {modal}
      {props.data.map((folder) =>
        folderGenerator(
          folder,
          props.theme[folder.theme],
          folder.id === props.active,
          props.changeFolder,
          props.delFolder
        )
      )}
      <div className={wrapstyle.folder_container}>
        <div
          onClick={() => props.toggleModal()}
          className={wrapstyle.add_folder}
        >
          ADD FOLDER
        </div>
      </div>
    </div>
  );
}

export default SidebarFolder;
