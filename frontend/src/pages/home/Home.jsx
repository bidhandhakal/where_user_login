import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      home
      <Link to="/user/login">Login</Link>
      <Link to="/user/register">Register</Link>
    </div>
  );
};

export default Home;
