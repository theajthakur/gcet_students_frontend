import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHistory, FaTimes } from "react-icons/fa";

export default function SuggestedUser(props) {
  if (!localStorage.search_history) {
    localStorage.setItem("search_history", JSON.stringify([]));
  }
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.search_history)
  );
  const userListRev = userList.reverse();
  const handleDelete = (id) => {
    const updatedUsers = userList.filter((user) => user.sr_no !== id);
    setUserList(updatedUsers);
    localStorage.setItem("search_history", JSON.stringify(updatedUsers));
  };
  const users = props.users;
  return (
    <>
      <div className="user_suggested">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.sr_no}
              className="user_entity d-flex rounded bg-white mb-2"
            >
              <div className="profile_pic p-1">
                <img
                  src={`http://localhost:8000/static/profile/picture/${user.adm_no}?w=100&h=100`}
                  width="50px"
                  alt="DP"
                />
              </div>
              <div className="user_detail p-1">
                <h6 className="m-0">
                  <Link to={`/search/${user.sr_no}`} state={{ fromLink: true }}>
                    {user.name}
                  </Link>
                </h6>
                <p className="m-0">
                  {user.branch} - {user.section}
                </p>
              </div>
            </div>
          ))
        ) : userList.length > 0 ? (
          userListRev.map((user) => (
            <div
              key={user.sr_no}
              className="user_entity d-flex rounded recent_result mb-2"
              style={{ position: "relative" }}
            >
              <div className="profile_pic p-1">
                <img
                  src={`http://localhost:8000/static/profile/picture/${user.adm_no}?w=100&h=100`}
                  width="50px"
                  alt="DP"
                />
              </div>
              <div className="user_detail p-1">
                <h6 className="m-0">
                  <Link to={`/search/${user.sr_no}`}>{user.name}</Link>
                </h6>
                <p className="m-0">
                  {user.branch} - {user.section}
                </p>
              </div>
              <div className="meta_details ms-auto text-secondary opacity-25 align-items-center pe-2">
                <p className="m-0 icon_papa h-50 d-flex align-items-center">
                  <FaHistory />
                </p>
                <p
                  onClick={() => handleDelete(user.sr_no)}
                  className="m-0 icon_papa h-50 d-flex text-danger align-items-center"
                >
                  <FaTimes />
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            {localStorage.setItem("search_history", [])}
            <div className="alert alert-warning text-center">
              <p className="m-0">Search By Name or Admission Number</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
