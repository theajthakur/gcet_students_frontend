import React from "react";
import { useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";

export default function UserForm() {
  const [formData, setFormData] = useState(null);
  const [placeValue, placeValueSet] = useState("Enter Student's Name");

  const formHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    let query = userData.query;
    query = query.toUpperCase();

    const url = `http://localhost:8000/student/?type=${userData.type}&query=${query}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      });
      setFormData(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };

  const typeSelector = (event) => {
    const dataT = event.target;
    const selectedValue = dataT.value;

    if (selectedValue !== "") {
      switch (selectedValue) {
        case "name":
          placeValueSet("Enter Student's Name");
          break;

        case "admission":
          placeValueSet("Enter Student's Admission Number");
          break;

        default:
          break;
      }
    } else {
      document.getElementById("queryBox").style.display = "none";
    }
  };

  const form_d = (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-warning">
              <h3 className="text-center m-0 text-dark">Search Student</h3>
            </div>
            <div className="card-body">
              <form method="POST" className="userForm" onSubmit={formHandler}>
                <div className="form-group mb-3">
                  <select
                    name="type"
                    className="form-select"
                    onChange={typeSelector}
                  >
                    <option value="name">Student's Name</option>
                    <option value="admission">Admission Number</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="queryBox"
                    name="query"
                    className="form-control"
                    required
                    placeholder={placeValue}
                  ></input>
                </div>
              </form>
              <div className="student_table">
                {formData && <DataTable data={formData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return form_d;
}
