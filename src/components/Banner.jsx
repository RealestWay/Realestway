import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXN0YXRlfGVufDB8fDB8fHww')] bg-cover bg-center">
      {/* Video Background */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Overlay Content */}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-center bg-black bg-opacity-50 text-white text-center">
        <PageNav />
        <div className="my-30">
          <h1
            className="sm:text-4xl text-3xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome <br />
            to <br />
            Realestway
          </h1>
          <p className=" mt-2">Find your dream home effortlessly</p>
        </div>
        {isAuthenticated ? (
          <Link
            to="/ItemsPage"
            className="w-1/2 mb-10 sm:w-2/5 bg-[#100073] text-lg hover:bg-blue-800 py-3 rounded-xl text-white font-sm"
          >
            <FontAwesomeIcon icon={faSearch} /> Search
          </Link>
        ) : (
          <div className="w-4/6 mb-10 sm:flex justify-around">
            <Link
              to="/SignIn"
              className="w-full mb-4 block sm:mb-0 sm:w-2/5 bg-[#100073] hover:bg-blue-800 py-3 rounded-xl text-white font-sm"
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              className="w-full block sm:w-2/5 bg-[#00A256] hover:bg-green-800 py-3 rounded-xl text-white font-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
