// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FiLock } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Password reset successful!");
//         setPassword("");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(data.error || "Failed to reset password");
//       }
//     } catch (err) {
//       toast.error("Network error");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
//       <ToastContainer />

//       {/* Heading */}
//       <h1 className="text-3xl font-bold text-orange-500 mb-2 text-center">Reset Password</h1>
//       <p className="text-sm text-gray-700 mb-6 text-center">
//         Enter your new password below to reset your account.
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="w-full max-w-xs">
//         <div className="relative mb-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
//           />
//           <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-teal-500 text-white font-medium py-3 rounded-xl mb-4 hover:bg-teal-600 transition duration-300 text-sm"
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>

//       <p className="text-sm text-gray-600 mt-2 text-center">
//         Remembered your password?{" "}
//         <span
//           onClick={() => navigate("/login")}
//           className="text-teal-500 font-medium cursor-pointer"
//         >
//           Sign In
//         </span>
//       </p>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful!");
        setPassword("");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.error || "Failed to reset password");
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
      <h1 className="text-4xl font-extrabold text-orange-500 mb-2 text-center">
        Reset Password
      </h1>
      <p className="text-sm text-gray-700 mb-8 text-center">
        Enter your new password to secure your account.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-3 pr-10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-xl mb-6 hover:bg-teal-600 transition duration-300 text-sm"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-2 text-center">
        Remember your password?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-teal-500 font-medium cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default ResetPassword;
