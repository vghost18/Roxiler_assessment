import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div></div> {/* Empty space for left alignment */}
      <div className="brand-name">Dashboard</div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Tables</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
        <li>
          <Link to="/pie-chart">Pie Chart</Link>
        </li>
        <li>
          <Link to="/bar-chart">Bar Chart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
