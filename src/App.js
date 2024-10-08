import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
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
  const navigate = useNavigate();

  // Show Navbar on all routes except /login
  const ShowNavbar = () => {
    const location = useLocation();
    return location.pathname !== "/login" ? <Navbar /> : null;
  };

  useEffect(() => {
    // Redirect to login if no token is found and the current path is not '/login'
    if (!token && window.location.pathname !== "/login") {
      navigate("/login");
    }
  }, [token, navigate]);

  if (auth === null) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ShowNavbar />
      <Routes>
        <Route
          path="/feeds"
          element={<ProtectedRoute element={<Feeds />} auth={auth} />}
        />
        <Route
          path="/about"
          element={<ProtectedRoute element={<About />} auth={auth} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} auth={auth} />}
        />
        <Route
          path="/search"
          element={<ProtectedRoute element={<Search />} auth={auth} />}
        />
        <Route
          path="/search/:id"
          element={<ProtectedRoute element={<UserProfile />} auth={auth} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="*"
          element={<Navigate to={token ? "/feeds" : "/login"} />}
        />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

// Component to protect routes
const ProtectedRoute = ({ element, auth }) => {
  if (auth === null) {
    return <Loader />;
  }

  return auth ? element : <Navigate to="/login" />;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
