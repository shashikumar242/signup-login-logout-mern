import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { store } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useContext(store);

  const Navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSumbitForm = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    


  useEffect(() => {
    if (token) {
      Navigate("/my-profile");
    }
  }, [token, Navigate]);

  return (
    <div>
      <center>
        <form onSubmit={handleSumbitForm} className="form">
          <h2>Login Form</h2>

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />

          <input type="submit" value="Login" />
        </form>
      </center>
    </div>
  );
};

export default Login;
