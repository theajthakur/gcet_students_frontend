import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [user, setUser] = useState(null); // State to hold user data

  const [connection, setConnection] = useState(false);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  function connectionRequest() {
    if (connection) {
      setConnection(false);
    } else {
      setConnection(true);
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.token;
      try {
        const response = await fetch(`http://localhost:8000/student/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        // Initialize search_history as an empty array
        let search_history = [];

        // Check if search_history exists in localStorage
        if (localStorage.getItem("search_history")) {
          // Parse the stored string back into an array
          search_history = JSON.parse(localStorage.getItem("search_history"));
        }

        // Check if the result.name is not already in search_history
        if (!search_history.some((d) => d.name === result.name)) {
          // Create a new entry object
          const tmp = {
            name: result.name,
            sr_no: result.sr_no,
            branch: result.branch,
            section: result.section,
          };

          // Push the new entry into the search_history array
          search_history.push(tmp);

          // Store the updated array back into localStorage as a string
          localStorage.setItem(
            "search_history",
            JSON.stringify(search_history)
          );
        }

        setUser(result); // Set the user data in state
      } catch (err) {
        setError(err.message); // Set error message in state
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchUser(); // Call the function to fetch user data
  }, [id]); // Dependency array to refetch if ID changes

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="container my-4">
      <div className="d-flex">
        <div className="px-5 justify-content-center align-items-center h-100">
          <img
            src={user.profile_pic || "/image/profile_pic/user.jpg"} // Default image if profile_pic is null
            className="profile_pic_main"
            alt="Profile"
          />
        </div>
        <div className="px-5">
          <h3 className="text-secondary">{user.name}</h3>
          <p className="m-0">
            {user.branch} - {user.section}
          </p>
          <p className="m-0 mb-1">56 Connections</p>
          <button
            className={`btn btn-${
              connection === true ? "success" : "secondary"
            } py-1 px-2`}
            onClick={connectionRequest}
          >
            {connection === true ? "Connected" : "+ Ask Connection"}
          </button>
        </div>
      </div>
    </div>
  );
}
