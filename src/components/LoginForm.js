import React from "react";

export default function LoginForm() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-warning">
              <h3 className="m-0 text-center">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label for="admissionNumber">Admission Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="admissionNumber"
                    placeholder="Enter admission number"
                  />
                </div>
                <div className="form-group">
                  <label for="fatherName">Father Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fatherName"
                    placeholder="Enter father’s name"
                  />
                </div>
                <button type="submit" className="btn w-100 btn btn-warning">
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
