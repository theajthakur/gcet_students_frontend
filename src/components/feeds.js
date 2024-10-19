import React, { useState } from "react";
import { FaComment, FaFlag, FaPlus, FaThumbsUp } from "react-icons/fa";
export default function Feeds() {
  const [posts, setPosts] = useState([
    {
      user: {
        name: "Vijay Singh",
        followed: true,
      },
      post: {
        id: 2993673,
        thumbnail:
          "https://www.manchalamushafir.com/tour/kedarnath-yatra/images/kedarnath-view.webp",
        date_uploaded: "24 August",
        description:
          "Finding peace at the foot of the mountains—Kedarnath, where the divine meets the majestic. 🕉️✨ #Blessed #Kedarnath",
      },
      interaction: {
        likes: 26,
        comments: 9,
      },
    },
  ]);
  if (2 > 3) {
    setPosts([]);
  }
  return (
    <div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            {posts.map((post) => (
              <div
                key={post.post.id}
                className="post-container bg-light rounded-2 py-2 mb-3"
              >
                <div className="post-header">
                  <div className="user-detail px-3">
                    <div className="user_card d-flex">
                      <div>
                        <p className="username m-0">{post.user.name}</p>
                        <p className="timestamp m-0 small opacity-75">
                          {post.post.date_uploaded}
                        </p>
                      </div>
                      <p className="ms-auto my-auto">
                        {post.user.followed ? (
                          ""
                        ) : (
                          <button className="btn btn-secondary disabled">
                            <FaPlus className="icon me-1" />
                            Unfollow
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="post-body py-2">
                  <div className="user-post">
                    <img
                      alt={post.post.description.substring[(0, 10)]}
                      src={post.post.thumbnail}
                      width={"100%"}
                    />
                  </div>
                </div>
                <div className="post-footer">
                  <p className="px-1 opacity-75">{post.post.description}</p>
                  <div
                    className="feed-intract pt-2"
                    style={{ borderTop: "1px solid lightgrey" }}
                  >
                    <div className="d-flex opacity-50">
                      <div className="left_interact px-2">
                        <div className="d-inline-block px-2">
                          <FaThumbsUp className="icon small" />{" "}
                          {post.interaction.likes}
                        </div>
                        <div className="d-inline-block px-2">
                          <FaComment className="icon small" />{" "}
                          {post.interaction.comments}
                        </div>
                      </div>
                      <div className="right_interact ms-auto pe-2">
                        <p className="m-0 small">
                          <FaFlag /> Report
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
