import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          GCET
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/students">
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
