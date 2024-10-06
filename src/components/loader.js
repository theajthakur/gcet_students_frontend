import React from "react";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center  w-100 p-3">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
