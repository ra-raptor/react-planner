import React from "react";
import navcss from "../styles/navbar.module.css";

function Navbar() {
  return (
    <nav className={`hello ${navcss.navbar}`}>
      <div className={navcss.brand}>PlanX</div>
      <ul>
        <li>About</li>
        <li>FAQ</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
