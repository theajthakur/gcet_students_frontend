import React from "react";

export default function Profile() {
  return (
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
              </div>
              <div className="col-12 mt-2">
                <button className="btn btn-warning w-100">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
