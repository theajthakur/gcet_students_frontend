import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [admNo, setAdmNo] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!name || !father || !admNo) {
      setError("All fields are required.");
      return;
    }

    const userData = {
      name,
      father,
      adm_no: admNo,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        userData
      );
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token); // Store token without 'Bearer' prefix
        navigate("/feeds"); // Redirect to a protected route upon successful login
      } else {
        setError("Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-info">
              <h3 className="m-0 text-center">Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Display error messages */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="admissionNumber">Admission Number</label>
                  <input
                    type="text"
                    name="adm_no"
                    value={admNo}
                    onChange={(e) => setAdmNo(e.target.value)}
                    className="form-control"
                    id="admissionNumber"
                    placeholder="Enter admission number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Father's Name</label>
                  <input
                    value={father}
                    onChange={(e) => setFather(e.target.value)}
                    type="text"
                    name="father"
                    className="form-control"
                    id="fatherName"
                    placeholder="Enter father's name"
                    required
                  />
                </div>
                <button type="submit" className="btn w-100 btn btn-info">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
