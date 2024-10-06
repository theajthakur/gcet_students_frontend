import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Profile() {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({
    mobile: 9695146906,
    email: "thakurvijayofficial@gmail.com",
  });
  const updateProfile = async (event) => {
    event.preventDefault();
    const formData = {
      mobile: profile.mobile,
      email: profile.email,
      profile: profile.profile,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (response.ok) {
        // Handle successful response
        console.log("Profile updated successfully.");
      } else {
        // Handle errors
        console.error("Error updating profile:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateVal = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  if (2 > 3) {
    setProfile([]);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="mt-5">
        <div className="profileContainer row justify-content-center m-0">
          <div className="col-md-8 col-lg-6">
            <div className="card py-2 bg-light">
              <div className="row d-flex align-items-center justify-content-center px-2">
                <div className="col-md-6 col-lg-4">
                  <img
                    src="/image/profile_pic/user.jpg"
                    width={"100%"}
                    alt="Profile"
                  />
                  <p className="mt-3 m-0 text-center text-primary">
                    Change Profile Picture
                  </p>
                </div>
                <div className="col-md-6 col-lg-8">
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <table className="table" style={{ margin: "auto" }}>
                      <tbody>
                        <tr>
                          <th>Sr No :</th>
                          <td>66</td>
                        </tr>
                        <tr>
                          <th>Name :</th>
                          <td>Vijay Singh</td>
                        </tr>
                        <tr>
                          <th>Father :</th>
                          <td>Dharmendra Singh</td>
                        </tr>
                        <tr>
                          <th>Branch :</th>
                          <td>CSE-C</td>
                        </tr>
                        <tr>
                          <th>Admission No :</th>
                          <td>24GCEBCS201</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={handleShow}
                    className="mt-3 btn btn-warning w-100"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateProfile} className={"m-0 profile_updater"}>
            <div className="form-group">
              <input
                type="number"
                name="mobile"
                className="form-control"
                placeholder="Your Mobile Number"
                onChange={updateVal}
                value={profile.mobile}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email Address"
                onChange={updateVal}
                value={profile.email}
              />
            </div>
            <button className="btn btn-warning w-100">Save</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
