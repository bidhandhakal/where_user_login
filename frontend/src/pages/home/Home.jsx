import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="flex items-center space-x-8 bg-white p-6 rounded-lg shadow-md">
        <span className="text-gray-800 font-medium text-5xl">Home</span>
        <div className="flex space-x-4">
          <Link
            to="/user/login"
            className="text-5xl text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            to="/user/register"
            className="text-5xl text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
