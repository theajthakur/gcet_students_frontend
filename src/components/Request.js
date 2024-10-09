import React from "react";

export default function Request() {
  return (
    <div>
      <div className="follow-requests">
        <div className="card">
          <div className="user-info d-flex">
            <div className="profile-picture">
              <img
                src="/image/profile_pic/user.jpg"
                alt="profile-picture"
                style={{ width: "50px" }}
              />
            </div>
            <div className="profile-meta w-100 ps-2 align-items-center d-flex">
              <h4>Vijay Singh</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
