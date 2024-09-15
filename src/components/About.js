import React from "react";

export default function About() {
  return (
    <div className="container mt-3 text-center">
      <h1 className="text-center text-warning">About</h1>
      <p className="p-5 bg-light">
        As a first-year student at GCET, I created this site as a way to
        practice and enhance my skills. I’ve built it using ReactJS, ExpressJS,
        NodeJS, and MySQL, and I’ve incorporated Bootstrap to ensure a
        responsive design. I hope you enjoy exploring it! Your feedback is
        incredibly valuable to me, so if you have any suggestions or ideas for
        improvements, please don’t hesitate to share them. I’m always eager to
        learn and improve. Thanks for checking it out!
      </p>
      <div className="mt-3">
        <form className="row m-0 justify-content-center">
          <div className="col-sm-10 col-md-6">
            <textarea className="form-control" rows="6"></textarea>
            <button className="mt-2 btn btn-warning w-100">
              Send Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
