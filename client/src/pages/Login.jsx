import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
    toast.error("Please fill in all fields");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (formData.password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }


    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        toast.success("Login successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        toastClassName="max-w-md mx-auto"
        toastStyle={{
          maxWidth: '448px', 
          margin: '0 auto'
        }}
      />

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-orange-500 mb-2">Monetra</h1>
      <p className="text-sm text-black mb-8">Sign in into your account</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Password */}
        <div className="relative mb-2">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="text-right text-sm text-blue-400 mb-6">
          <button type="button" onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl mb-6"
        >
          SIGN IN
        </button>
      </form>

      
      <p className="text-sm text-black">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-green-500 font-medium cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
