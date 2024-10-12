import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Request from "./Request";
import Loader from "./loader";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    sr_no: 961,
    branch_sr: null,
    class_sr: null,
    branch: null,
    section: null,
    tmp_roll: null,
    adm_no: null,
    name: null,
    father_name: null,
    profile_pic: null,
    email: null,
    mobile: null,
  });
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setloading(false);
          setProfile(result);
        } else {
          console.error("Error fetching profile:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProfile();
  }, []);
  const updateProfile = async (event) => {
    event.preventDefault();
    const formData = {
      mobile: profile.mobile,
      email: profile.email,
      profile: profile.profile,
    };
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
      if (response.ok) {
        toast.success("Profile Updated!");
        setShow(false);
      } else {
        // Handle errors
        console.error("Error updating profile:", result);
      }
    } catch (error) {
      toast.error("Something went wrong!");
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
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.warn("Successfully Logout");
    navigate("/login");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-5 container">
            <div className="profileContainer row justify-content-center m-0">
              <div className="col-lg-8 mb-3">
                <div className="card py-2 bg-light">
                  <div className="row d-flex align-items-center justify-content-center px-2">
                    <div className="col-md-6 col-lg-4 text-center">
                      <img
                        src={`/image/profile_pic/${
                          profile.profile_pic ? profile.profile_pic : "user.jpg"
                        }`}
                        width={"100%"}
                        style={{
                          borderRadius: "50%",
                          width: "200px",
                          padding: "20px",
                        }}
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
                              <td>{profile.sr_no}</td>
                            </tr>
                            <tr>
                              <th>Name :</th>
                              <td>{profile.name}</td>
                            </tr>
                            <tr>
                              <th>Father :</th>
                              <td>{profile.father_name}</td>
                            </tr>
                            <tr>
                              <th>Branch :</th>
                              <td>{profile.branch_sr}</td>
                            </tr>
                            <tr>
                              <th>Admission No :</th>
                              <td>{profile.adm_no}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          onClick={handleShow}
                          className="btn btn-warning w-100 me-2"
                        >
                          Update Profile
                        </button>
                        <button
                          onClick={handleLogOut}
                          className="btn btn-danger"
                          style={{ minWidth: "50px" }}
                        >
                          <FaSignOutAlt className="icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <Request />
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
                    value={profile.mobile ? profile.mobile : ""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    onChange={updateVal}
                    value={profile.email ? profile.email : ""}
                  />
                </div>
                <button className="btn btn-warning w-100">Save</button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
