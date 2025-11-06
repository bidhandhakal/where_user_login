import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    // Only allow emails ending with @gmail.com
    return /.+@gmail\.com$/.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!fullname.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please use a valid Gmail address (e.g., example@gmail.com)");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password requirements:\n• Minimum 8 characters\n• At least one uppercase letter\n• At least one lowercase letter\n• At least one number\n• At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/user/register",
        {
          fullname,
          email,
          password,
        }
      );

      console.log(response.data);
      toast.success("Registration successful! Please login to continue");

      // Wait for toast before navigation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/user/login");
    } catch (error) {
      console.error("Registration failed:", error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-6">
      <Toaster position="top-right" />
      <div className="w-full max-w-md space-y-8 px-4 sm:px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/src/assets/logo.svg"
              alt="AgroConnect Logo"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AgroConnect</h1>
          <p className="mt-1 text-sm text-gray-500">
            Cultivating Digital Solutions
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative flex p-1 bg-gray-100 rounded-full shadow-inner">
            <div
              className="absolute bg-white rounded-full transition-all duration-300 shadow-lg"
              style={{ width: "50%", height: "85%", top: "7.5%", left: "49%" }}
            ></div>
            <Link
              to="/user/login"
              className="relative z-10 px-8 py-2 text-center text-gray-500 hover:text-[#157539] transition-colors duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </div>
            </Link>
            <Link
              to="/user/register"
              className="relative z-10 px-8 py-2 text-center font-medium text-[#157539] transition-colors duration-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <span>Register</span>
              </div>
            </Link>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm text-gray-600 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#157539]"
                style={{ "--tw-ring-color": "#157539" }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#157539]"
                style={{ "--tw-ring-color": "#157539" }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="Create a password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#157539]"
                style={{ "--tw-ring-color": "#157539" }}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.402 3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575m1.875-2.25A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.402 3.22-1.125 4.575m-1.875 2.25A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575"
                    />
                    <line
                      x1="4.93"
                      y1="4.93"
                      x2="19.07"
                      y2="19.07"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#157539" }}
          >
            Create Account
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or register with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              className="h-5 w-5 mr-2 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
