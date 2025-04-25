import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../context/authcontext";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Registration() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsRegistering(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsRegistering(false);
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    console.log("Google button clicked");

    if (!userLoggedIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithGoogle();
        console.log("Google sign-in success:", result);
        navigate("/home");
      } catch (err) {
        console.error("Google sign-in error:", err.message);
        setErrorMessage(err.message);
      }
      setIsSigningIn(false);
    }
  };


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
            Create your account below
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {/* Full Name */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-[#74124A]">
              <FiUser />
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-[#74124A] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#74124A]"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-[#74124A]">
              <FiLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full border border-[#74124A] rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#74124A]"
              required
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 text-[#74124A] cursor-pointer"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isRegistering}
            className="bg-[#74124A] text-white rounded-lg py-3 hover:bg-[#5b0f3c] transition"
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>

          {/* Google Sign In */}
          {/* <button
            onClick={onGoogleSignIn}
            disabled={isSigningIn}
            className="text-black border border-gray-400 py-2 my-4 w-full rounded hover:bg-gray-200 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24px"
              height="24px"
              className="mr-2"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.12 0 5.83 1.1 7.99 2.91l5.88-5.88C33.9 3.56 29.21 1.5 24 1.5 14.86 1.5 7.37 7.38 4.68 15.44l6.85 5.33C13.32 15.36 18.21 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M24 43.5c5.17 0 9.53-1.72 12.69-4.68l-6.08-4.92c-1.76 1.13-4.01 1.8-6.61 1.8-5.01 0-9.26-3.39-10.77-7.96l-6.73 5.19C10.35 39.46 16.72 43.5 24 43.5z"
              />
              <path
                fill="#FBBC05"
                d="M35.65 38.82C39.24 35.7 41.5 30.36 41.5 24c0-1.16-.1-2.3-.29-3.39H24v7.89h10.01c-.46 2.36-1.78 4.36-3.66 5.77l6.3 4.94z"
              />
              <path
                fill="#EA4335"
                d="M10.45 28.33C9.99 26.99 9.75 25.54 9.75 24c0-1.54.24-2.99.7-4.33l-6.85-5.33C2.31 17.61 1.5 20.71 1.5 24c0 3.29.81 6.39 2.35 9.33l6.6-5z"
              />
            </svg>
            Sign in with Google
          </button> */}
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <button
            className="text-[#74124A] font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

        <p className="text-center text-xs mt-4 text-gray-400">
          © Aisha Dry Cleaner 2025
        </p>
      </div>
    </div>
  );
}

export default Registration;
