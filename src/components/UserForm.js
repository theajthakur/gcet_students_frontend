import React from "react";
import { useState, useEffect } from "react";

export default function UserForm() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placeValue, placeValueSet] = useState("Enter Student's Name");

  useEffect(() => {
    fetch("./public/galgotia_data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));
    // console.log(data);
  };

  const typeSelector = (event) => {
    const dataT = event.target;
    const selectedValue = dataT.value;

    if (selectedValue !== "") {
      switch (selectedValue) {
        case "name":
          placeValueSet("Enter Student's Name");
          break;

        case "adm_no":
          placeValueSet("Enter Student's Admission Number");
          break;

        default:
          break;
      }
    } else {
      document.getElementById("queryBox").style.display = "none";
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center m-0">Search Student</h3>
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
                    <option value="adm_no">Admission Number</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="queryBox"
                    name="query"
                    className="form-control"
                    required="true"
                    placeholder={placeValue}
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
