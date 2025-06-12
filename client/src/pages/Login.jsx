import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
      localStorage.setItem("access_token", data.access_token);

        alert("Login successful!");
        navigate("/")

      } else {
        alert(data.error || "Login failed");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-black mr-12">
        <h1 className="font-bold text-3xl text-black">Style Sustainably, Shop Smartly!</h1>
        <ul className="mt-2 text-[20px]">
          <li>✨Handpicked items for every style and occasion.</li>
          <li>🌱Reduce waste, reuse resources, and shop sustainably.</li>
          <li>💸Quality items at prices you’ll love.</li>
        </ul>
      </div>

      <div className="w-full max-w-lg p-6 pb-5 bg-white rounded-lg shadow-md ml-19 mt-10">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black font-medium text-white text-[20px] p-3 rounded hover:bg-gray"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
