import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchUsers, fetchAgents } = useAuth();
  const [formData, setFormData] = useState({
    id: `u${Date.now()}`,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error message on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!res.ok) throw new Error("Failed to create account");
    } catch (err) {
      setError("There was an error signing up. Please try again.");
    }
    fetchAgents();
    fetchUsers();
    navigate("/signIn");
  };

  return (
    <div className="bg-gradient-to-b from-green-500 min-h-screen to-blue-800 py-10 flex items-center justify-center">
      <div className="sm:w-[30%] w-[90%]">
        <h2 className="my-2 text-white text-lg mb-2 font-semibold">Sign Up</h2>
        <div className="rounded-2xl bg-white p-3 w-full pt-8">
          <form
            className="flex-col justify-center items-center m-auto"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faUser} color="lightblue" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-[95%] pl-10 border-b border-gray-400 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} color="lightblue" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-[95%] pl-10 border-b border-gray-400 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faPhone} color="lightblue" />
              </div>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className="w-[95%] pl-10 border-b border-gray-400 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} color="lightblue" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-[95%] pl-10 border-b border-gray-400 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} color="lightblue" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-[95%] pl-10 border-b border-gray-400 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            {/* Display error message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button className="w-[95%] bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-2 mt-3">
              Create Account
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500 text-center">
            or sign in using
          </p>
          <div className="flex justify-around">
            <button className="bg-blue-600 px-5 w-[40%] py-1 rounded-xl text-white">
              Facebook
            </button>
            <button className="bg-red-600 px-5 py-1 w-[40%] rounded-xl text-white">
              Google
            </button>
          </div>
          <p className="flex justify-center mt-3 text-gray-500 text-sm">
            By creating an account, you agree to our{" "}
            <span className="text-green-500 px-1">Terms</span>
          </p>
          <p className="flex text-gray-500 justify-center mt-9 text-sm">
            Already have an account?{" "}
            <Link to={"/signIn"} className="text-green-500 px-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
