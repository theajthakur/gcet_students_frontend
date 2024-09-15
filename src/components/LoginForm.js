import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [admNo, setAdmNo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    try {
      const data = await axios.post("http://localhost:8000/login", userData);
      const token = data.data.token;
      if (token) {
        localStorage.setItem("token", "Bearer " + token);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Father Name</label>
                  <input
                    value={father}
                    onChange={(e) => setFather(e.target.value)}
                    type="text"
                    name="father"
                    className="form-control"
                    id="fatherName"
                    placeholder="Enter father’s name"
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
