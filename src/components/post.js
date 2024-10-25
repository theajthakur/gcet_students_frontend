import React, { useState } from "react";
import { FaImage, FaPaperPlane, FaVideo } from "react-icons/fa";

export default function Post() {
  const [postCaption, setPostCaption] = useState("");
  const formtriggered = (event) => {
    const curVal = event.target.value.trim();
    if (curVal.length <= 200) {
      setPostCaption(curVal);
    }
  };
  return (
    <>
      <div className="post-publisher mb-3 p-1 bg-light">
        <div className="post-textarea-container">
          <textarea
            className="form-control"
            onChange={formtriggered}
            value={postCaption}
            style={{ resize: "none" }}
            placeholder="Share your thoughts with world..."
          />
          <p
            className={`small m-0 text-end ${
              postCaption.length === 200 ? "text-danger" : "text-success"
            }`}
          >
            {postCaption ? postCaption.length : "0"}/200
          </p>
        </div>
        <div className="attachment-post d-inline-flex w-100">
          <div className="attach-child picture p-2">
            <FaImage className="icon" />
          </div>
          <div className="attach-child picture p-2">
            <FaVideo className="icon" />
          </div>
          {postCaption ? (
            <div className="post-submit-btn ms-auto p-1">
              <button className="btn btn-outline-primary py-1 px-3">
                <FaPaperPlane className="icon" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
