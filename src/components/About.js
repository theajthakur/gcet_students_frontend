import React from "react";
import { FaClock } from "react-icons/fa";

export default function About() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <FaClock className="icon h1 text-danger mb-5" />
          <h3 className="text-danger">It will take some time.....</h3>
        </div>
        <br></br>
      </div>
    </>
  );
}
