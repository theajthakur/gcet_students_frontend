import React from "react";

export default function Loader() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
