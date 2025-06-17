// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";



// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         // Save token to localStorage
//       localStorage.setItem("access_token", data.access_token);

//         alert("Login successful!");
//         navigate("/")

//       } else {
//         alert(data.error || "Login failed");
//       }
//     } catch {
//       alert("Network error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen ">
//       <div className="text-black mr-12">
//         <h1 className="font-bold text-3xl text-black">Style Sustainably, Shop Smartly!</h1>
//         <ul className="mt-2 text-[20px]">
//           <li>✨Handpicked items for every style and occasion.</li>
//           <li>🌱Reduce waste, reuse resources, and shop sustainably.</li>
//           <li>💸Quality items at prices you’ll love.</li>
//         </ul>
//       </div>

//       <div className="w-full max-w-lg p-6 pb-5 bg-white rounded-lg shadow-md ml-19 mt-10">
//         <h2 className="text-3xl font-bold text-center">Login</h2>
//         <form className="mt-4" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-black font-medium text-white text-[20px] p-3 rounded hover:bg-gray"
//           >
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

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
      <ToastContainer />

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-orange-500 mb-2">Hello!</h1>
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
            required
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
            required
            className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="text-right text-sm text-gray-500 mb-6">
          <button type="button">Forgot Password</button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-xl mb-6"
        >
          SIGN IN
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-sm text-black">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-teal-500 font-medium cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
