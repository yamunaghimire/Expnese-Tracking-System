// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const SignupForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     try {
//       const response = await fetch("http://127.0.0.1:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Registration successful!");
//         navigate("/login");
//       } else {
//         alert(data.error || "Registration failed");
//       }
//     } catch {
//       alert("Network error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="text-4xl font-bold text-black mr-8">
//         Join us <br /> on this journey <br /> to spend <br /> better.
//       </div>

//       <div className="w-full max-w-lg bg-white p-8 mt-[62px] rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center mb-4">Sign up </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               id="username"
//               type="text"
//               name="username"
//               value={formData.fullname}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Fullname"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Your email"
//               required
//             />
//           </div>



//           <div className="mb-4">
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded"
//               placeholder="Your password"
//               required
//             />
//           </div>

          

//           <button
//             type="submit"
//             className="w-full text-white font-medium text-[20px] bg-black p-3 rounded hover:bg-gray transition duration-300"
//           >
//             Sign up
//           </button>
//           <button className= "ml-[100px] mt-5"onClick={() => navigate("/login")}>
//   Already have an account? <span className="text-blue-500">Login</span>
// </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white">
      <ToastContainer />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-orange-500 mb-2 text-center">
        Get Started
      </h1>
      <p className="text-sm text-black mb-8 text-center">
        by creating your account.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] flex flex-col gap-4"
      >
        {/* Username */}
        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full bg-gray-100 text-sm text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full bg-gray-100 text-sm text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full bg-gray-100 text-sm text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500"
          />
          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold text-sm py-3 rounded-xl mt-2"
        >
          SIGN UP
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-500 font-medium cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
       