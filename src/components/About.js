import React, { Component } from "react";
import "../styles/about.css";

class About extends Component {
  render() {
    return (
      <div className="about-wrapper">
        <h2>ABOUT</h2>
        <p>
          PlanX is a simple card based todo-list type open source planning web
          app made with React Js. Users can organise cards into folders and can
          apply custom themes.
        </p>
        <p>
          Use the folders tab to select folders, delete folders and to create
          new folders. Click on the desired folder to open its content
        </p>
        <p>
          After selecting a folder, the cards in that folder will be displayed.
          Use the Edit button to edit the content of the card and the delete
          button to delete a card. new cards can be added by add card button.
        </p>
        <p>
          Select a theme from the theme tab. The theme will be applied to the
          selected folder. New themes can be also be created by choosing the
          background and foreground colour.
        </p>
        <p>
          Feel free to use the contact page for reporting any bugs or to share
          your thougts about this project.
        </p>
        <p className="footer">Made with 💙 by Vikas Saw</p>
      </div>
    );
  }
}

export default About;
