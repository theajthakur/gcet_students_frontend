import React from "react";

export default function Profile() {
  return (
    <div>
      <div className="profileContainer row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="profile_pic">
            <img src="/image/profile_pic/user.jpg" width={"100%"} />
          </div>
        </div>
      </div>
    </div>
  );
}
