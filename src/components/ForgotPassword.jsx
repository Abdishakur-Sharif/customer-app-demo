import React, { useState } from "react";
import { doPasswordReset } from "../firebase/auth";
import { FaEnvelope } from "react-icons/fa"; // using react-icons

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await doPasswordReset(email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#74124A] mb-2 text-center">
          Aisha Dry Cleaner
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#74124A] focus:outline-none placeholder:text-gray-400"
              placeholder="Email Address"
            />
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#74124A] text-white rounded-lg hover:bg-[#660000] transition-all font-medium"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          {errorMessage && (
            <p className="text-[#74124A] text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">
              {successMessage}
            </p>
          )}

          <div className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#74124A] hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
