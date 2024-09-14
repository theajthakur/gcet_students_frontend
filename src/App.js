import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
