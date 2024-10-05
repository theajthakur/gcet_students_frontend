import React from "react";

export default function SuggestedUser(props) {
  const users = props.users;

  return (
    <div className="user_suggested">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="user_entity d-flex rounded bg-white mb-2"
          >
            <div className="profile_pic p-1">
              <img src="/image/profile_pic/user.jpg" width="50px" alt="DP" />
            </div>
            <div className="user_detail p-1">
              <h6 className="m-0">{user.name}</h6>
              <p className="m-0">
                {user.branch} - {user.section}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No suggested users found</p>
      )}
    </div>
  );
}
