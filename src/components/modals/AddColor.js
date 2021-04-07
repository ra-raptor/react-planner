import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  };
  toggleBgPicker = () => {
    let newState = !this.state.showBgPicker;
    this.setState({
      showBgPicker: newState,
    });
  };

  handlefgChange = (color) => {
    this.setState({ fg: color.hex });
  };

  handlebgChange = (color) => {
    this.setState({ bg: color.hex });
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
                </button>
                {FgPicker}
              </div>
              <div>
                <button onClick={this.toggleBgPicker} style={bgbtnStyle}>
                  Background
                </button>
                {BgPicker}
              </div>
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
