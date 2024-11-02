import React, { useState } from "react";
import { FaImage, FaPaperPlane, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Post({ onPostData }) {
  const [postCaption, setPostCaption] = useState("");
  const formtriggered = (event) => {
    const curVal = event.target.value.replace(/\s+/g, " ");
    if (curVal.trim().length <= 200) {
      setPostCaption(curVal);
    }
  };

  const publishPost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/publish/post", {
        method: "POST",
        body: JSON.stringify({ caption: postCaption }),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        onPostData(result);
        toast.success("Post Published!");
        setPostCaption("");
      } else {
        console.error("Error fetching profile:", await response.json());
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <form onSubmit={publishPost} className="post-publisher mb-3 p-1 bg-white">
        <div className="post-textarea-container">
          <textarea
            name="caption"
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
      </form>
    </>
  );
}
