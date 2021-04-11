import React, { Component } from "react";
import "../styles/contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.messageRef = React.createRef();
  }

  handleSubmit = (event) => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxUSPxO6CKQYwICKXDEdLv2BTrLIbOU3NggwbEZFhM1GiPK7f4XElBgttP1yzQ-aQUHWQ/exec";
    const form = document.forms["form"];

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          alert("Thanks... I will contact you later :) ");
          this.emptyInput();
        })
        .catch((error) => {
          console.error("Error!", error.message);
          alert("Error!! Try after sometime..");
        });
    });
  };
  emptyInput = () => {
    this.nameRef.current.value = "";
    this.emailRef.current.value = "";
    this.messageRef.current.value = "";
  };
  render() {
    return (
      <div className="contact-wrapper">
        <h2>CONTACT</h2>
        <form onSubmit={this.handleSubmit} name="form">
          <div className="grid">
            <label htmlFor="name">Name :</label>
            <input
              name="name"
              type="text"
              ref={this.nameRef}
              required
              autoFocus
            />
            <label htmlFor="email">Email (optional) :</label>
            <input ref={this.emailRef} name="email" type="email" />
          </div>
          <div>
            <label htmlFor="message">Message :</label>

            <textarea
              ref={this.messageRef}
              required
              name="message"
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <input onClick={this.handleSubmit} type="submit" value="DONE" />
        </form>
      </div>
    );
  }
}

export default Contact;
