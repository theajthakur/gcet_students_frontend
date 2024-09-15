import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const shouldShowNavbar = window.location.pathname !== "/login";
  return (
    <Router>
      <div className="App">
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/students" element={<UserForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
