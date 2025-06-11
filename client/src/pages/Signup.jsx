import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-4xl font-bold text-black mr-8">
        Join us <br /> on this journey <br /> to spend <br /> better.
      </div>

      <div className="w-full max-w-lg bg-white p-8 mt-[62px] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Sign up </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="username"
              type="text"
              name="username"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Fullname"
              required
            />
          </div>

          <div className="mb-4">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your email"
              required
            />
          </div>



          <div className="mb-4">
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Your password"
              required
            />
          </div>

          

          <button
            type="submit"
            className="w-full text-white font-medium text-[20px] bg-black p-3 rounded hover:bg-gray transition duration-300"
          >
            Sign up
          </button>
          <button className= "ml-[100px] mt-5"onClick={() => navigate("/login")}>
  Already have an account? <span className="text-blue-500">Login</span>
</button>

        </form>
      </div>
    </div>
  );
};

export default SignupForm;
