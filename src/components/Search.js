import React, { useState } from "react";
import Feeds from "./feeds";
import SuggestedUser from "./SuggestedUser";
import "./search.css";
export default function Search() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);

  const userSearch = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const token = localStorage.token;
    if (username.length >= 4) {
      setloading(true);
      const response = await fetch(
        "http://localhost:8000/student/?type=name&query=" + username,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      // Read the response body once and store it
      const result = await response.json();
      setUsers(result);
      setloading(false);
      event.preventDefault();
    }
  };
  return (
    <div className="container-fluid ">
      <div className="row h-minus-nav">
        <div className="col-md-4 col-xl-3 h-100">
          <div className="p-2 bg-light h-100 side-container">
            <form className="form-search m-0" onSubmit={userSearch}>
              <input
                autoComplete="off"
                type="text"
                name="username"
                className="form-control"
                placeholder="Student Name"
                id="username"
              />
            </form>
            <hr />
            <div className={loading ? "hor_loader" : "d-none"}></div>
            <SuggestedUser users={users} />
          </div>
        </div>
        <div className="col-md-8 col-xl-9 h-100 main-container">
          <Feeds />
        </div>
      </div>
    </div>
  );
}
