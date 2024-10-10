import React from "react";
import { FaCheck } from "react-icons/fa";
import "./request.css";
export default function Request() {
  return (
    <div>
      <div className="follow-requests">
        <div className="user-card">
          <div className="user-profile">
            <img
              src="/image/profile_pic/user.jpg"
              style={{ width: "50px" }}
              alt="Profile Pic"
            />
          </div>
          <div className="user-meta">
            <div className="user-name">
              <h3 className="m-0">vijay singh</h3>
            </div>
            <div className="user-profile">
              <p className="m-0">238 followers</p>
            </div>
          </div>
          <div className="user-interact ms-auto">
            <button className="btn btn-success">
              <FaCheck className="icon" />
            </button>
          </div>
        </div>
        <div className="user-card">
          <div className="user-profile">
            <img
              src="/image/profile_pic/user.jpg"
              style={{ width: "50px" }}
              alt="Profile Pic"
            />
          </div>
          <div className="user-meta">
            <div className="user-name">
              <h3 className="m-0">vijay singh</h3>
            </div>
            <div className="user-profile">
              <p className="m-0">238 followers</p>
            </div>
          </div>
          <div className="user-interact ms-auto">
            <button className="btn btn-success">
              <FaCheck className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
