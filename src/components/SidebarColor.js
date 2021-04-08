import React from "react";
import wrapstyle from "../styles/wrapper.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import AddColor from "./modals/AddColor";

let colorboxBuilder = (item, active, updfunc) => {
  const bgstyle = (col) => {
    return {
      background: col,
    };
  };
  let indicator = (
    <FontAwesomeIcon
      className={wrapstyle.color_item_check}
      color={item.fg}
      icon={faCheck}
    />
  );
  let bg = item.bg;
  let fg = item.fg;
  return (
    <div
      key={item.id}
      style={bgstyle(bg)}
      onClick={() => updfunc(item.id)}
      className={wrapstyle.color_item}
    >
      {active ? indicator : ""}
      <div style={bgstyle(fg)} className={wrapstyle["color_item-fg"]}></div>
    </div>
  );
};

function SidebarColor(props) {
  let setModalVisible = () => {};
  let modal = props.showModal ? (
    <AddColor addTheme={props.addTheme} changeModal={props.changeModal} />
  ) : (
    true
  );

  let activeTheme;
  try {
    activeTheme =
      props.folders.filter((e) => e.id === props.active)[0].theme || 0;
  } catch {
    activeTheme = -1;
  }
  return (
    <div className={wrapstyle.sidebar_color}>
      Themes
      {modal}
      <div className={wrapstyle.color_container}>
        {props.data.map((color) =>
          colorboxBuilder(color, color.id === activeTheme, props.update)
        )}
        <div
          onClick={() => props.changeModal()}
          className={wrapstyle["add-color_item"]}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default SidebarColor;
