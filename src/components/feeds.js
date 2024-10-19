import React from "react";
import { FaComment, FaPlus, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
export default function feeds() {
  return (
    <div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="post-container bg-light rounded-2 py-2">
              <div className="post-header px-3">
                <div className="user-detail">
                  <div className="user_card d-flex">
                    <div>
                      <p className="username m-0">Vijay Singh</p>
                      <p className="timestamp m-0 small opacity-75">
                        24 August
                      </p>
                    </div>
                    <p className="ms-auto my-auto">
                      <button className="btn btn-primary">
                        <FaPlus className="icon me-1" />
                        Follow
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="post-body py-2">
                <div
                  className="user-post"
                  style={{ height: "300px", background: "lightgrey" }}
                ></div>
              </div>
              <div className="post-footer">
                <div className="feed-intract pt-2">
                  <div className="d-flex">
                    <div className="left_interact opacity-50 px-2">
                      <div className="d-inline-block px-2">
                        <FaThumbsUp className="icon small" />
                      </div>
                      <div className="d-inline-block px-2">
                        <FaThumbsDown className="icon small" />
                      </div>
                      <div className="d-inline-block px-2">
                        <FaComment className="icon small" />
                      </div>
                    </div>
                    <div className="right_interact ms-auto pe-2">
                      <p className="m-0 small">9 Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
