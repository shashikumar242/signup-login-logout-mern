import React, { useState, createContext } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Myprofile from "./components/Myprofile";

export const store = createContext();

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <store.Provider value={[token,setToken]}>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-profile" element={<Myprofile />} />
          </Routes>
        </Router>
      </store.Provider>
    </div>
  );
}

export default App;
