import React from "react";
import { Link } from "react-router-dom";

export default function SuggestedUser(props) {
  const users = props.users;
  return (
    <div className="user_suggested">
      {users.length > 0
        ? users.map((user) => (
            <div
              key={user.sr_no}
              className="user_entity d-flex rounded bg-white mb-2"
            >
              <div className="profile_pic p-1">
                <img src="/image/profile_pic/user.jpg" width="50px" alt="DP" />
              </div>
              <div className="user_detail p-1">
                <h6 className="m-0">
                  <Link to={`/search/${user.sr_no}`}>{user.name}</Link>
                </h6>
                <p className="m-0">
                  {user.branch} - {user.section}
                </p>
              </div>
            </div>
          ))
        : JSON.parse(localStorage.search_history).map((user) => (
            <div
              key={user.sr_no}
              className="user_entity d-flex rounded bg-white mb-2"
              style={{ position: "relative" }}
            >
              <div className="profile_pic p-1">
                <img src="/image/profile_pic/user.jpg" width="50px" alt="DP" />
              </div>
              <div className="user_detail p-1">
                <h6 className="m-0">
                  <Link to={`/search/${user.sr_no}`}>{user.name}</Link>
                </h6>
                <p className="m-0">
                  {user.branch} - {user.section}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}
