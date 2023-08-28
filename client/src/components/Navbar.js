import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { store } from "../App";

const Navbar = () => {
  const [token, setToken] = useContext(store);

  return (
    <div className="nav-container">
      {!token && (
        <>
          <Link to="/register">
            <div className="nav-item">Register</div>
          </Link>

          <Link to="/login">
            <div className="nav-item">Login</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
