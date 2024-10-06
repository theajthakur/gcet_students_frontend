import React from "react";
import { FaCar } from "react-icons/fa";

export default function FourZeroFour() {
  return (
    <div className="row justify-content-center mx-0 mt-5">
      <div className="col-md-8 col-lg-6">
        <div className="text-center alert alert-danger p-3">
          <FaCar style={{ fontSize: "3rem" }} />
          <h3 className="text-danger">Not Found</h3>
          <p>
            The URL You are Requesting, does not exists! Please try with
            different URL.
          </p>
        </div>
      </div>
    </div>
  );
}
