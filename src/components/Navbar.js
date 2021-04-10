import React from "react";
import navcss from "../styles/navbar.module.css";

function Navbar() {
  return (
    <nav className={`hello ${navcss.navbar}`}>
      <div className={navcss.brand}>PlanX</div>
      <ul>
        <a href="/">
          <li>About</li>
        </a>
        <a href="https://github.com/ra-raptor/react-planner">
          <li>Github</li>
        </a>
        <a href="/">
          <li>Contact</li>
        </a>
      </ul>
    </nav>
  );
}

export default Navbar;
