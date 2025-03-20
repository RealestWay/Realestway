import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { UseHouses } from "../../contexts/HouseContext";

const SignIn = () => {
  const [email, setEmail] = useState("bob@example.com");
  const [password, setPassword] = useState("Realest");
  const [showPassWord, setShowPassWord] = useState(false);
  const { fetchHouses } = UseHouses();
  const navigate = useNavigate();

  const { login, isAuthenticated, loginMsg } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) login(email, password);
    fetchHouses();
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/ItemsPage");
  }, [isAuthenticated]);
  return (
    <div className="bg-gradient-to-b from-green-500 min-h-screen to-blue-800 py-10 items-center justify-center flex">
      <div className="sm:w-[30%] w-[90%]">
        <h2 className="my-2 text-white text-lg mb-2 font-semibold">Sign In</h2>
        <div className="rounded-2xl bg-white p-3 w-full pt-8">
          <form
            className="m-5/6 flex-col justify-center items-center m-auto mb-20"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} color="lightblue" />
              </div>
              <input
                type="Email"
                placeholder="Email"
                className="w-[95%] border-b pl-8 border-gray-400 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FontAwesomeIcon icon={faLock} color="lightblue" />
              </div>
              <input
                type={showPassWord ? "text" : "password"}
                placeholder="Password"
                className="w-[95%] border-b border-gray-400 pl-8 p-2 my-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassWord(!showPassWord)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                <FontAwesomeIcon icon={showPassWord ? faEye : faEyeSlash} />
              </button>
            </div>
            <p className="text-red-600 flex justify-center">{loginMsg}</p>
            <Link
              to="/forgotPassword"
              className="text-red-400 flex items-center justify-center my-5"
            >
              Forget Password?
            </Link>
            <button className="w-[95%] bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-2">
              Sign In
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500 justify-center w-full flex">
            or sign in using
          </p>
          <div className="flex justify-around">
            <button className="bg-blue-600 px-5 w-[40%] py-1 rounded-xl text-white">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
            <button className="bg-red-600 px-5 py-1 w-[40%] rounded-xl text-white">
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
          </div>
          <p className="flex justify-center mt-3 text-gray-500 text-sm">
            By creating an account, you agree to our
            <span className="text-green-500 px-1">Terms</span>
          </p>
          <p className="flex text-gray-500 justify-center mt-9 text-sm  ">
            Don`t have an account?
            <Link to={"/SignUp"} className="text-green-500 px-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
