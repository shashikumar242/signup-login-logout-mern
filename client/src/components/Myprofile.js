import React, { useContext, useState, useEffect } from "react";
import { store } from "../App";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Myprofile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);

  useEffect(() => {
    const headers = {
      "x-token": token,
    };
    try {
      axios
        .get("http://localhost:5000/myprofile", {
          headers,
        })
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {data && (
        <center>
          Welcom user : {data.username} <br />
          <button onClick={() => setToken(null)}>Logout</button>
        </center>
      )}
    </div>
  );
};

export default Myprofile;
