import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaUser } from "react-icons/fa";
import Loader from "./loader";
import "./request.css";
import { toast } from "react-toastify";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function manageReq(reqid, reqType) {
    const allowedTypes = ["accept", "decline"];
    if (!allowedTypes.includes(reqType)) return;
    var url = `http://localhost:8000/follow/${reqType}/${reqid}`;
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });

      const result = await response.json();
      setRequests(result.remainingRequests);
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went Wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/follow/request", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const result = await response.json();
        setRequests(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {requests.length > 0 ? (
        <div className="follow-requests">
          {requests.map((request) => (
            <div className="user-card" key={request.id}>
              <div className="user-profile">
                <img
                  src={`/image/profile_pic/${
                    request.follower.profile_pic
                      ? request.follower.profile_pic
                      : "user.jpg"
                  }`}
                  style={{ width: "50px" }}
                  alt="Profile Pic"
                />
              </div>
              <div className="user-meta w-100">
                <h3 className="text-center m-0">{request.follower.name}</h3>
              </div>
              <div className="user-interact ms-auto">
                <button
                  onClick={() => manageReq(request.id, "accept")}
                  className="btn btn-success"
                >
                  <FaCheck className="icon" />
                </button>
                <button
                  onClick={() => manageReq(request.id, "decline")}
                  className="btn btn-danger"
                >
                  <FaTimes className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center py-2">
          <FaUser className="mt-3 h3" />
          <p>No Pending Request found</p>
        </div>
      )}
    </div>
  );
}
