import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navbar(props) {
  console.log(props.user.user);
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
              <img
                width="30px"
                className="d-inline-block"
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  border: "1px solid lightgrey",
                }}
                src={`/image/profile_pic/${
                  props.user.user.profile_pic
                    ? props.user.user.profile_pic
                    : "user.jpg"
                }`}
                alt="profile_pic"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
