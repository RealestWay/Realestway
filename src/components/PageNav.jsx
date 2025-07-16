import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Call,
  CloseSquare,
  HamburgerMenu,
  Home2,
  InfoCircle,
  LogoutCurve,
  Profile,
  SearchNormal1,
} from "iconsax-reactjs";

// eslint-disable-next-line react/prop-types
const PageNav = ({ home }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu
  const [mdOptOpen, setMdOptOpen] = useState(false);
  const navStyle = home
    ? "shadow flex items-center text-center min-h-12 w-4/5 text-sm m-auto px-4 rounded-3xl bg-white bg-opacity-30 relative"
    : "shadow shadow-[#8a7bf0] text-center flex items-center min-h-12 w-4/5 text-sm mx-auto px-4 rounded-3xl bg-white relative";

  return (
    <nav className="w-full mt-10 mb-3 px-50 h-20 ">
      <ul className={navStyle}>
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
          className={`md:font-normal z-50 absolute top-full left-0 w-full rounded-lg md:static md:w-4/5 md:flex md:ml-10 md:items-center md:justify-between transition-all duration-300 ${
            isOpen ? "block bg-white text-[black]" : "hidden"
          }`}
        >
          <span className="w-5/6">
            <li className="md:inline-block block p-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "items-center flex text-[#100073]"
                    : "items-center flex"
                }
              >
                {" "}
                {isOpen ? <Home2 color="#00A256" className="mr-2" /> : ""}
                <span>Home</span>
              </NavLink>
            </li>
            <li className="md:inline-block block p-3 ">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive
                    ? "items-center flex text-[#100073]"
                    : "items-center flex"
                }
              >
                {isOpen ? (
                  <SearchNormal1 color="#00A256" className="mr-2" />
                ) : (
                  ""
                )}
                <span>Search Property</span>
              </NavLink>
            </li>
            <li className="md:inline-block block p-3">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "items-center flex text-[#100073]"
                    : "items-center flex"
                }
              >
                {isOpen ? <InfoCircle color="#00A256" className="mr-2" /> : ""}
                <span>About Us</span>
              </NavLink>
            </li>
            <li className="md:inline-block block p-3">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "items-center flex text-[#100073]"
                    : "items-center flex"
                }
              >
                {isOpen ? <Call color="#00A256" className="mr-2" /> : ""}
                <span>Contact Us</span>
              </NavLink>
            </li>
          </span>
          {isAuthenticated ? (
            <>
              {" "}
              <li className="md:inline-block block p-3 relative">
                {isOpen ? (
                  <NavLink
                    to="/Profile"
                    className={({ isActive }) =>
                      isActive
                        ? "items-center flex text-[#100073]"
                        : "items-center flex"
                    }
                  >
                    <Profile
                      color="#00A256"
                      className={`${isOpen ? "mr-2" : ""}`}
                    />
                    <span>Profile</span>
                  </NavLink>
                ) : (
                  <span
                    className="items-center flex bg-black rounded-[50%] p-1 bg-opacity-10"
                    onClick={() => setMdOptOpen(!mdOptOpen)}
                  >
                    <Profile
                      color="#00A256"
                      className={`${isOpen ? "mr-2" : ""}`}
                    />
                  </span>
                )}
                {mdOptOpen ? (
                  <div className="absolute rounded-md text-sm md:gap-2 bg-white text-[#100073] hidden md:flex md:flex-col right-4 top-10 w-[100px] p-2">
                    <NavLink
                      to="/Profile"
                      className={({ isActive }) =>
                        isActive
                          ? "items-center flex border-b-[1px] py-1 border-[#8f8d9b] text-[#100073]"
                          : "items-center flex border-b-[1px] py-1 border-[#8f8d9b]"
                      }
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={logout}
                      className="rounded-lg py-1 flex items-center"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </li>
              <li className="md:hidden flex items-center p-1">
                <button
                  onClick={logout}
                  className="max-w-4xl mx-auto px-6 py-2 rounded-lg shadow-lg mt-4 text-red-600 font-bold flex items-center mb-5"
                >
                  <LogoutCurve
                    color="red"
                    className={`${isOpen ? "mr-2" : ""}`}
                  />{" "}
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <span className="flex gap-2 justify-center md:justify-normal">
              <li
                className={`${
                  isOpen ? "text-white text-lg" : ""
                } md:inline-block block w-full bg-[#00a256] md:bg-inherit rounded-b-lg md:rounded-none py-3 md:py-1 px-16 md:px-2`}
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "items-center flex text-[#100073]"
                      : "items-center flex"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li className="md:inline-block hidden p-3 py-1 px-3 rounded-3xl bg-white bg-opacity-20 ">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "items-center flex text-[#100073]"
                      : "items-center flex"
                  }
                >
                  Register
                </NavLink>
              </li>
            </span>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default PageNav;
