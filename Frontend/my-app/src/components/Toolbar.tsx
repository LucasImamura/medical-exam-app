import React from "react";
import { Link } from "react-router"; // Fix import
import "./Toolbar.css";

function Toolbar(): React.JSX.Element {
  return (
    <header className="toolbar">
      <nav className="toolbar-nav">
        <ul className="toolbar-left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/exam">Exams</Link>
          </li>
          <li>
            <Link to="/schedules">Schedules</Link>
          </li>
        </ul>
        <ul className="toolbar-right">
          <li>
            <Link to="/examcreator">Admin Page</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Toolbar;
