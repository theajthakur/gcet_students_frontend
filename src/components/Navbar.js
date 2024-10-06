import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          GCET
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/search">
              <FaSearch className="icon" />
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
