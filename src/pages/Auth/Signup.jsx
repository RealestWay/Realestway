import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Spinner2 from "../../components/Spinner2";
import PageNav from "../../components/PageNav";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUsers, fetchAgents } = useAuth();
  const [checkUser, setCheckUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: `u${Date.now()}`,
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referrer_id: "", // <-- added for referral
  });
  const [error, setError] = useState("");

  // Handle URL ref param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, referrer_id: ref }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const checkExistingUserOrAgent = async (email) => {
    try {
      setIsLoading(true);
      const user = await fetchUsers(email, formData.password);
      const agent = await fetchAgents(email, formData.password);
      if (user || agent) return true;
      setIsLoading(false);
      return false;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const exists = await checkExistingUserOrAgent(formData.email);
    if (exists) {
      setCheckUser("User or agent with this email is already registered.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("https://backend.realestway.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email.toLowerCase(),
          phone: formData.phone,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          referrer_id: formData.referrer_id || null,
        }),
      });

      setIsLoading(false);
      if (!res.ok) throw new Error("Failed to create account");

      navigate("/check-email");
    } catch (err) {
      setError("There was an error signing up. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b relative pb-20 text-center from-[#00A256] min-h-screen to-[#100073]">
      <div className="flex-col flex items-center justify-center">
        <PageNav home={false} />
        <div className="md:w-[45%] sm:w-[40%] w-[90%] lg:w-[30%]">
          <h2 className="my-2 text-white text-lg mb-2 font-semibold text-left">
            Sign Up
          </h2>
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
              <p className="text-red-600 flex justify-center">{checkUser}</p>

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

              {/* Display Referral ID if Present */}
              {formData.referrer_id && (
                <p className="text-xs text-green-600 mt-1">
                  Referral ID applied: <strong>{formData.referrer_id}</strong>
                </p>
              )}

              {/* Error */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Submit Button */}
              <button className="w-[95%] bg-gradient-to-r from-green-500 to-[#100073] text-white rounded-xl p-2 mt-3">
                Create Account
              </button>
            </form>

            <p className="mt-5 text-sm text-gray-500 text-center">or</p>
            <div className="flex justify-around">
              <button className="bg-[#100073] px-5 text-xs py-1 rounded-xl text-white">
                <Link to={"/onboard"}>Become An Agent</Link>
              </button>
            </div>
            <p className="flex justify-center mt-3 text-gray-500 text-sm">
              By creating an account, you agree to our{" "}
              <span className="text-green-500 px-1">Terms</span>
            </p>
            <p className="flex text-gray-500 justify-center mt-9 text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="text-green-500 px-1">
                {isLoading ? <Spinner2 /> : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <p className="flex justify-center w-full p-4 absolute bottom-0 text-white font-bold border-t-[1px] mt-3">
        &copy; Copyright {new Date().getFullYear()} by Realestway
      </p>
    </div>
  );
};

export default Signup;
