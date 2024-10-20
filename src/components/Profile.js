import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Request from "./Request";
import Loader from "./loader";
import axios from "axios";
export default function Profile() {
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upload, setUpload] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    "http://localhost:8000/static/profile/picture/0"
  );
  const [isDragging, setIsDragging] = useState(false);
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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setProfile(result);
          setImageSrc(
            `http://localhost:8000/static/profile/picture/${result.adm_no}`
          );
        } else {
          console.error("Error fetching profile:", await response.json());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    const updateProfilePicture = async (imageSrc) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/profile/picture",
          { imageData: imageSrc },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error uploading image:", error.response.data);
        } else {
          console.error("Error in image upload:", error.message);
        }
      }
    };

    if (upload) {
      updateProfilePicture(imageSrc);
    }
  }, [upload, imageSrc, token]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageSrc(reader.result);
        setUpload(true);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImageSrc(reader.result);
        setUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    const { mobile, email } = profile;
    const formData = { mobile, email };

    try {
      const response = await fetch("http://localhost:8000/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile Updated!");
        setShow(false);
      } else {
        console.error("Error updating profile:", await response.json());
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateVal = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    toast.warn("Successfully logged out");
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5 container">
          <div className="profileContainer row justify-content-center m-0">
            <div className="col-lg-8 mb-3">
              <div className="card py-2 bg-light">
                <div className="row d-flex align-items-center justify-content-center px-2">
                  <div
                    className={`col-md-6 col-lg-4 text-center ${
                      isDragging ? "dp_dragging" : ""
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <img
                      src={`${imageSrc}?w=200&h=200`}
                      width="200"
                      style={{ borderRadius: "50%", padding: "20px" }}
                      alt="Profile"
                    />
                    <div>
                      <p
                        className="mt-3 m-0 text-center text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => fileInputRef.current.click()}
                      >
                        Change Profile Picture
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateProfile} className="m-0 profile_updater">
                <div className="form-group">
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    placeholder="Your Mobile Number"
                    onChange={updateVal}
                    value={profile.mobile || ""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    onChange={updateVal}
                    value={profile.email || ""}
                  />
                </div>
                <button className="btn btn-warning w-100 mt-3">Update</button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}
