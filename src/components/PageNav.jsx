import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faTimes,
  faHome,
  faPhone,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const PageNav = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <nav className="w-full my-10 px-50 h-20">
      <ul className="shadow flex items-center min-h-12 py-2 p-3 w-2/3 m-auto bg-white text-black rounded-3xl border border-gray-500 border-1 relative">
        {/* Logo Section (Fixed in Place) */}
        <Link to={"/"} className="flex flex-shrink-0">
          <img
            src="/Realestway horizontal.svg"
            alt="logo"
            width={170}
            height={100}
          />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden ml-auto text-xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} color="#100073" />
        </button>

        {/* Navigation Links (Responsive) */}
        <div
          className={`text-lg md:font-normal absolute top-full left-0 w-full text-[#100073] bg-white rounded-xl md:static md:w-4/5 md:flex md:ml-10 md:items-center md:justify-between transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/" className="items-center">
              {isOpen ? (
                <FontAwesomeIcon
                  icon={faHome}
                  color="#00A256"
                  className="mr-2"
                />
              ) : (
                ""
              )}
              Home
            </NavLink>
          </li>
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/AboutUs">
              {isOpen ? (
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  color="#00A256"
                  className="mr-2"
                />
              ) : (
                ""
              )}
              About
            </NavLink>
          </li>
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/ContactUs">
              {isOpen ? (
                <FontAwesomeIcon
                  icon={faPhone}
                  color="#00A256"
                  className="mr-2"
                />
              ) : (
                ""
              )}
              Contact Us
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li className="md:inline-block block p-3">
              <NavLink to="/Profile">
                <FontAwesomeIcon
                  icon={faUser}
                  color="#00A256"
                  className={`${isOpen ? "mr-2" : ""}`}
                />
                {isOpen ? "Profile" : ""}
              </NavLink>
            </li>
          ) : (
            <li className="md:inline-block block p-3 bg-[#100073] py-2 px-4 rounded-xl text-white">
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default PageNav;
