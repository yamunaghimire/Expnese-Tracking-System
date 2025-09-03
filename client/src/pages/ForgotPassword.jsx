import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Check your email for the reset link!");
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white">
      <ToastContainer />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-orange-500 mb-2 text-center">Forgot Password?</h1>
      <p className="text-sm text-black mb-8 text-center">
        Enter your registered email to receive a password reset link
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="relative mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl mb-6 hover:bg-green-600 transition duration-300"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Back to login */}
      <p className="text-sm text-black">
        Remember your password?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-green-500 font-medium cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
