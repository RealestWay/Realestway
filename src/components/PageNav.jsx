import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Call,
  CloseSquare,
  HamburgerMenu,
  Home2,
  InfoCircle,
  Profile,
} from "iconsax-reactjs";

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
          {isOpen ? (
            <CloseSquare color="#100073" />
          ) : (
            <HamburgerMenu color="#100073" />
          )}
        </button>

        {/* Navigation Links (Responsive) */}
        <div
          className={`text-lg md:font-normal absolute top-full left-0 w-full text-[#100073] bg-white rounded-xl md:static md:w-4/5 md:flex md:ml-10 md:items-center md:justify-between transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/" className="items-center flex justify-center">
              {" "}
              {isOpen ? <Home2 color="#00A256" className="mr-2" /> : ""}
              <span>Home</span>
            </NavLink>
          </li>
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/about" className="items-center flex justify-center">
              {isOpen ? <InfoCircle color="#00A256" className="mr-2" /> : ""}
              <span>About</span>
            </NavLink>
          </li>
          <li className="md:inline-block block p-3 font-bold">
            <NavLink to="/contact" className="items-center flex justify-center">
              {isOpen ? <Call color="#00A256" className="mr-2" /> : ""}
              <span>Contact</span>
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li className="md:inline-block block p-3">
              <NavLink
                to="/Profile"
                className="items-center flex justify-center"
              >
                <Profile
                  color="#00A256"
                  className={`${isOpen ? "mr-2" : ""}`}
                />
                {isOpen ? <span className="font-bold">Profile</span> : ""}
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
