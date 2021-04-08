import {
  faEye,
  faEyeSlash,
  faPhotoVideo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { SketchPicker } from "react-color";
import ReactDom from "react-dom";
import modalStyle from "../../styles/modals.module.css";

class AddColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fg: "#000",
      bg: "#fff",
      showFgPicker: false,
      showBgPicker: false,
    };
  }

  toggleFgPicker = () => {
    let newState = !this.state.showFgPicker;
    this.setState({
      showFgPicker: newState,
    });
    if (newState == true && window.innerWidth <= 800) {
      this.setState({
        showBgPicker: false,
      });
    }
  };

  toggleBgPicker = () => {
    let newState = !this.state.showBgPicker;
    this.setState({
      showBgPicker: newState,
    });
    if (newState == true && window.innerWidth <= 800) {
      this.setState({
        showFgPicker: false,
      });
    }
  };

  handlefgChange = (color) => {
    this.setState({ fg: color.hex });
  };

  handlebgChange = (color) => {
    this.setState({ bg: color.hex });
  };

  doneButtonHandler = () => {
    let fg = this.state.fg;
    let bg = this.state.bg;
    if (
      (fg != "#000" && fg != "#000000") ||
      (bg != "#fff" && bg != "#ffffff")
    ) {
      this.props.addTheme(fg, bg);
      this.props.changeModal();
    } else {
      alert("please create a custom theme..");
    }
  };

  render() {
    let bgbtnStyle = {
      border: `2px solid ${this.state.bg}`,
    };
    let fgbtnStyle = {
      border: `2px solid ${this.state.fg}`,
    };
    let sampleCardStyle = {
      background: this.state.bg,
      color: this.state.fg,
    };

    let FgPicker = this.state.showFgPicker ? (
      <SketchPicker onChange={this.handlefgChange} color={this.state.fg} />
    ) : (
      ""
    );

    let BgPicker = this.state.showBgPicker ? (
      <SketchPicker onChange={this.handlebgChange} color={this.state.bg} />
    ) : (
      ""
    );

    let showHideIconStyle = {
      marginLeft: "1rem",
    };

    let iconBuilder = (val) => {
      if (val) {
        return <FontAwesomeIcon icon={faEyeSlash} style={showHideIconStyle} />;
      } else {
        return <FontAwesomeIcon icon={faEye} style={showHideIconStyle} />;
      }
    };

    return ReactDom.createPortal(
      <React.Fragment>
        <div className={modalStyle.overlay}></div>
        <div className={modalStyle.modalBox}>
          <h1 className={modalStyle.title}>Add Theme</h1>
          <div className={modalStyle.addColorWrapper}>
            <div style={sampleCardStyle} className={modalStyle.sampleColor}>
              sample card
            </div>
            <div className={modalStyle.colorPickerWrapper}>
              <div>
                <button onClick={this.toggleFgPicker} style={fgbtnStyle}>
                  Foreground
                  {iconBuilder(this.state.showFgPicker)}
                </button>
                {FgPicker}
              </div>
              <div>
                <button onClick={this.toggleBgPicker} style={bgbtnStyle}>
                  Background
                  {iconBuilder(this.state.showBgPicker)}
                </button>
                {BgPicker}
              </div>
            </div>
            <div className={modalStyle.submitColorWrapper}>
              <button onClick={this.doneButtonHandler}>DONE</button>
            </div>
          </div>

          <div
            className={modalStyle.close}
            onClick={() => this.props.changeModal()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("portal")
    );
  }
}

export default AddColor;
