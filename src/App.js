import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Search from "./components/search";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Feeds from "./components/feeds";
import { useAuth } from "./hooks/useAuth";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import Loader from "./components/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
const App = () => {
  const auth = useAuth();
  const token = localStorage.getItem("token");

  // Show Navbar on all routes except /login
  const ShowNavbar = () => {
    const location = useLocation();
    return location.pathname !== "/login" ? <Navbar /> : null;
  };

  if (auth === null) {
    return <Loader />;
  }

  // Redirect to login if no token is found and the current path is not '/login'
  if (!token && window.location.pathname !== "/login") {
    return (
      <div>
        You are not logged in. Please <a href="/login">Login</a> to proceed
        further.
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <ShowNavbar />
        <Routes>
          <Route
            path="/feeds"
            element={<ProtectedRoute element={<Feeds />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/search"
            element={<ProtectedRoute element={<Search />} />}
          />
          <Route
            path="/search/:id"
            element={<ProtectedRoute element={<UserProfile />} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="*"
            element={<Navigate to={token ? "/feeds" : "/login"} />}
          />
        </Routes>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
};

// Component to protect routes
const ProtectedRoute = ({ element }) => {
  const auth = useAuth();

  if (auth === null) {
    return <Loader />;
  }

  return auth ? element : <Navigate to="/login" />;
};

export default App;
