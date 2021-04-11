import React from "react";
import navcss from "../styles/navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={`hello ${navcss.navbar}`}>
      <Link to="/">
        <div className={navcss.brand}>PlanX</div>
      </Link>
      <ul>
        <Link to="/about">
          <li>About</li>
        </Link>
        <a href="https://github.com/ra-raptor/react-planner">
          <li>Github</li>
        </a>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
