import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/authcontext";

function LogIn() {
  const navigate = useNavigate();
  const { userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsSigningIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-[#74124A] flex items-center justify-center mb-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#74124A"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 2C2.897 2 2 2.897 2 4V20C2 21.103 2.897 22 4 22H20C21.103 22 22 21.103 22 20V4C22 2.897 21.103 2 20 2H4ZM4 4H20L20.002 20H4V4ZM17 6C16.447 6 16 6.447 16 7C16 7.553 16.447 8 17 8C17.553 8 18 7.553 18 7C18 6.447 17.553 6 17 6ZM14 6C13.447 6 13 6.447 13 7C13 7.553 13.447 8 14 8C14.553 8 15 7.553 15 7C15 6.447 14.553 6 14 6ZM12 9C9.243 9 7 11.243 7 14C7 16.757 9.243 19 12 19C14.757 19 17 16.757 17 14C17 11.243 14.757 9 12 9ZM12 11C13.654 11 15 12.346 15 14C15 15.654 13.654 17 12 17C10.346 17 9 15.654 9 14C9 12.346 10.346 11 12 11Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#74124A]">
            Aisha Dry Cleaner
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please log in
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-[#74124A]">
              <FiMail />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-[#74124A] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74124A]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-[#74124A]">
              <FiLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-[#74124A] rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#74124A]"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-[#74124A] cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSigningIn}
            className="bg-[#74124A] text-white rounded-lg py-3 hover:bg-[#5b0f3c] transition"
          >
            {isSigningIn ? "Logging In..." : "Log In"}
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <button
            className="text-[#74124A] font-medium hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>

        <p className="text-center text-sm mt-6">
          Forgot Password?{" "}
          <button
            className="text-[#74124A] font-medium hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Reset Password
          </button>
        </p>

        <p className="text-center text-xs mt-4 text-gray-400">
          © Aisha Dry Cleaner 2025
        </p>
      </div>
    </div>
  );
}

export default LogIn;
