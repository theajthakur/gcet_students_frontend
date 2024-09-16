import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import { useAuth } from "./hooks/useAuth";
import Profile from "./components/Profile";

const App = () => {
  const auth = useAuth();
  const token = localStorage.getItem("token");

  // Show Navbar on all routes except /login
  const ShowNavbar = () => {
    const location = useLocation();
    return location.pathname !== "/login" ? <Navbar /> : null;
  };

  if (auth === null) {
    // Show a loading spinner or similar while checking auth status
    return <div>Loading...</div>;
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
            path="/students"
            element={<ProtectedRoute element={<UserForm />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="*"
            element={<Navigate to={token ? "/students" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

// Component to protect routes
const ProtectedRoute = ({ element }) => {
  const auth = useAuth();

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? element : <Navigate to="/login" />;
};

export default App;
