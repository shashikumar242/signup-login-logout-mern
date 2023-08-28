import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSumbitForm = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/register", data)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <center>
        <form onSubmit={handleSumbitForm} className="form">
          <h2>Registration Form</h2>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={handleOnChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />

          <input type="submit" value="Register" />
        </form>
      </center>
    </div>
  );
};

export default Register;
