import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Loader from "./loader";
import { toast } from "react-toastify";
import { FaCheck, FaUserMinus, FaPlus, FaComment } from "react-icons/fa";
import FourZeroFour from "./FourZeroFour";
import { Modal } from "react-bootstrap";

export default function UserProfile() {
  const location = useLocation();
  const token = localStorage.token;
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [self, setSelf] = useState(true);
  const [show, setShow] = useState(false);
  const [connection, setConnection] = useState("nofollow");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle connection requests
  const connectionRequest = async () => {
    const url =
      connection === "follow" || connection === "requested"
        ? "http://localhost:8000/follow/remove/"
        : "http://localhost:8000/follow/request/";

    const method =
      connection === "follow" || connection === "requested" ? "POST" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ following: id }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setConnection(
          connection === "follow" || connection === "requested"
            ? "nofollow"
            : "requested"
        );
      } else {
        toast.error(result.error);
        console.error(result.error);
      }
    } catch (error) {
      console.error("Connection request failed:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`http://localhost:8000/student/${id}`, {
          method: "GET",
          headers: { Authorization: token },
        });

        if (!response.ok) return <FourZeroFour />;

        const result_t = await response.json();
        const result = result_t.student;

        setUser(result); // Set user data

        setSelf(result.self);
        setConnection(
          result.follow === "follow"
            ? "follow"
            : result.follow === "requested"
            ? "requested"
            : "nofollow"
        );

        // Update search history in localStorage if needed
        const searchHistory =
          JSON.parse(localStorage.getItem("search_history")) || [];
        if (
          location.state?.fromLink &&
          !result.self &&
          !searchHistory.some((d) => d.name === result.name)
        ) {
          const newEntry = {
            name: result.name,
            sr_no: result.sr_no,
            adm_no: result.adm_no,
            branch: result.branch,
            section: result.section,
          };
          localStorage.setItem(
            "search_history",
            JSON.stringify([...searchHistory, newEntry])
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, location.state, token]); // Removed self from dependencies since it's managed by the fetched data

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return user ? (
    <div className="container my-4">
      <div className="d-md-flex text-center text-md-start">
        <div className="px-5 justify-content-center align-items-center h-100">
          <img
            src={`http://localhost:8000/static/profile/picture/${user.adm_no}?w=200&h=200`}
            className="profile_pic_main"
            alt="Profile"
          />
        </div>
        <div className="px-5">
          <h3 className="text-secondary">
            {user.name}{" "}
            {user.verified && (
              <FaCheck className="icon text-success small opacity-50" />
            )}
          </h3>
          <p className="m-0">
            {user.branch} - {user.section}
          </p>
          <p className="m-0 mb-1">
            <span onClick={handleShow} className="text-primary">
              {user.followCount} Connection{user.followCount > 1 ? "s" : ""}
            </span>
          </p>
          {!self && (
            <>
              <button
                className={`btn btn-${
                  connection === "follow"
                    ? "success"
                    : connection === "requested"
                    ? "warning"
                    : "secondary"
                } py-1 px-2`}
                onClick={connectionRequest}
              >
                {connection === "follow" ? (
                  <>
                    <FaCheck className="icon" /> Connected
                  </>
                ) : connection === "requested" ? (
                  <>
                    <FaUserMinus className="icon" /> Requested
                  </>
                ) : (
                  <>
                    <FaPlus className="icon" /> Ask Connection
                  </>
                )}
              </button>

              {connection === "follow" && (
                <button className="btn btn-warning ms-2">
                  <FaComment className="icon" /> Chit Chat
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <br />
      <br />
      <hr />
      <div className="user_posts p-2">
        <div className="row">
          {/* Example of user posts - this can be rendered dynamically */}
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card bg-white p-2 h-100">
                  <div className="user-content p-2">
                    <p className="m-0">
                      Sample post content for user {index + 1}...
                    </p>
                  </div>
                  <div className="hashtags">
                    <span className="px-2 me-2 bg-light d-inline-block">
                      #SampleTag
                    </span>
                    <span className="px-2 me-2 bg-light d-inline-block">
                      #AnotherTag
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {user.followers.length > 0 ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row justify-content-center">
              {user.followers.map((follower) => (
                <div className="col-md-6">
                  <Link
                    to={`/search/${follower.follower.adm_no}`}
                    style={{ color: "black" }}
                  >
                    <div className="user-card">
                      <div className="user-card-inner d-flex align-items-center">
                        <div className="user-dp">
                          <img
                            alt="user_dp"
                            src={`http://localhost:8000/static/profile/picture/${follower.follower.adm_no}?w=50&h=50`}
                            style={{ width: "40px", borderRadius: "50%" }}
                          />
                        </div>
                        <div className="user-meta">
                          <h5 className="m-0" key={follower.follower.id}>
                            {follower.follower.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  ) : (
    <FourZeroFour />
  );
}
