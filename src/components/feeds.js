import React, { useState, useRef } from "react";
import { FaComment, FaFlag, FaPlus, FaThumbsUp } from "react-icons/fa";
import "./feeds.css";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
export default function Feeds() {
  const inputRef = useRef(null);
  function addComment(postId, newComment) {
    let post = posts.find((p) => p.post.id === postId);
    if (post) {
      post.interaction.comments.push(newComment);
      console.log("Comment added successfully!");
    } else {
      console.log("Post not found.");
    }
  }
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 283,
      adm_no: "24GCEBCS201",
      name: "Vijay Singh",
      date_created: "25 August",
      comment: "Awesome Picture 💖",
    },
    {
      id: 3863,
      adm_no: "24GCEBCS169",
      name: "Shreshtha Gupta",
      date_created: "29 August",
      comment: "Jay shree mahakal 🚩🚩",
    },
  ]);
  const [posts, setPosts] = useState([
    {
      user: {
        adm_no: "24GCEBCS201",
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
        liked: false,
        comments: [
          {
            name: "Sarthak Sharma",
            adm_no: "24GCEBCS164",
            date_created: "25 August",
            comment: "Hello Munna!",
          },
        ],
      },
    },
  ]);
  const likePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post.id === postId
          ? post.interaction.liked
            ? {
                ...post,
                interaction: {
                  ...post.interaction,
                  likes: post.interaction.likes - 1,
                  liked: false,
                },
              }
            : {
                ...post,
                interaction: {
                  ...post.interaction,
                  likes: post.interaction.likes + 1,
                  liked: true,
                },
              }
          : post
      )
    );
    const tmpo = posts.find((post) => post.post.id === postId);
    tmpo.interaction.liked
      ? toast.info("Post Unliked")
      : toast.info("Post Liked");
  };

  const postComment = (event) => {
    event.preventDefault();
    const commentValue = inputRef.current.value;
    if (!commentValue) return false;
    inputRef.current.value = "";
    const newCommentObj = {
      id: comments.length + 1,
      comment: commentValue,
      adm_no: "24GCEBCS201",
      name: "Vijay Singh",
      date_created: "20 October",
    };

    setComments([...comments, newCommentObj]);
    addComment(2993673, newCommentObj);
    toast.info("Comment Posted");
  };
  const showComments = (postId) => {
    const tmpc = posts.find((post) => post.post.id === postId);
    setComments(tmpc.interaction.comments);
    setShow(true);
  };
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
                      <div
                        className="user-profile-pic me-3"
                        style={{ width: "50px" }}
                      >
                        <img
                          alt={post.user.adm_no}
                          style={{
                            width: "100%",
                            borderRadius: "50%",
                            padding: "2px",
                          }}
                          src={`http://localhost:8000/static/profile/picture/${post.user.adm_no}`}
                        />
                      </div>
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
                    className="feed-interact pt-2"
                    style={{ borderTop: "1px solid lightgrey" }}
                  >
                    <div className="d-flex opacity-50">
                      <div className="left_interact px-2">
                        <div
                          className={`d-inline-block px-2 inte_btn ${
                            post.interaction.liked ? "text-primary" : ""
                          }`}
                          onClick={() => likePost(post.post.id)}
                        >
                          <FaThumbsUp className="icon small" />{" "}
                          {post.interaction.likes}
                        </div>
                        <div
                          className="d-inline-block px-2 inte_btn"
                          onClick={() => showComments(post.post.id)}
                        >
                          <FaComment className="icon small" />{" "}
                          {post.interaction.comments.length}
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "65vh", overflowY: "scroll" }}>
          <div className="comment-body">
            {comments.map((comment) => {
              return (
                <div
                  key={`comment-${comment.id}`}
                  className="comment mb-2 bg-light rounded-2 p-2"
                >
                  <div className=" d-flex w-100">
                    <div className="user-dp me-3" style={{ width: "30px" }}>
                      <img
                        alt="Commentator DP"
                        width="100%"
                        style={{ borderRadius: "50%" }}
                        src={`http://localhost:8000/static/profile/picture/${comment.adm_no}`}
                      />
                    </div>
                    <div className="middle-body">
                      <p className="smal h6 m-0">{comment.name}</p>
                      <p className="m-0 opacity-75 small">{comment.comment}</p>
                      <p className="m-0 small opacity-50">Reply</p>
                    </div>
                    <div className="meta-data ms-auto small opacity-50">
                      <p className="m-0">{comment.date_created}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <form
            onSubmit={postComment}
            className="post-comment pt-2"
            style={{ borderTop: "1px solid lightgrey" }}
          >
            <div className="d-flex">
              <div className="pe-1 w-100">
                <input
                  type="text"
                  className="form-control opacity-75"
                  placeholder="Your Comment...."
                  ref={inputRef}
                />
              </div>
              <div className="ms-auto">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
