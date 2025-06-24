import { useAuth } from "../../contexts/AuthContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  CloseCircle,
  Element4,
  HamburgerMenu,
  House,
  Message2,
  Notification,
  Profile,
  ProfileCircle,
} from "iconsax-reactjs";
import { useState } from "react";
import HouseUploadForm from "./HouseUploadForm";

const AgentProfile = () => {
  const { logout, agent } = useAuth();
  const [navIndex, setNavIndex] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const onClose = () => {
    setOpenForm(false);
  };
  return (
    <div className="md:flex h-screen">
      {/* Sidebar */}
      <Nav navIndex={navIndex} setNavIndex={setNavIndex} logout={logout} />
      <div className="w-full">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full">
          {/* Header */}
          <div className="hidden md:flex md:justify-between w-full items-center mb-6 p-6 bg-[#F3F3F3] border-b-[1px] border-[#AEBCC9]">
            <h2 className="text-xl">
              {agent?.companyName ? agent?.companyName : agent?.fullName}
            </h2>{" "}
            <span className="flex gap-2 items-center">
              <Notification color="#AEBCC9" variant="Bold" />{" "}
              <span className="items-center justify-center flex bg-black p-[3px] rounded-[50%] bg-opacity-10">
                <Profile color="#00A256" />
              </span>
            </span>
          </div>
          <div className="full overflow-y-scroll h-screen scrollbar-hide scrollbar-hidden">
            <Outlet context={setOpenForm} />
          </div>
          {openForm && <HouseUploadForm onClose={onClose} />}
        </main>
      </div>
    </div>
  );
};
const Nav = ({ navIndex, setNavIndex, logout }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className="hidden md:inline-block">
        <aside className="min-w-64 w-[20%] h-screen bg-[#F3F3F3] border-r-[1px] border-[#AEBCC9] shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8 border-b-[1px] border-[#AEBCC9] p-6">
              {" "}
              <Link to="/">
                <img src="/Realestway horizontal.svg" alt="logo" />
              </Link>
            </h2>
            <nav className="space-y-4 px-6">
              <NavLink
                to={"/profile"}
                className={
                  navIndex === 1
                    ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                    : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                }
                onClick={() => setNavIndex(1)}
              >
                <Element4 variant="Bold" size={18} /> Dashboard
              </NavLink>
              <NavLink
                to={"/profile/my-listings"}
                className={
                  navIndex === 2
                    ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                    : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                }
                onClick={() => setNavIndex(2)}
              >
                <House variant="Bold" size={18} /> My Listings
              </NavLink>
              <NavLink
                to={"/profile/messages"}
                className={
                  navIndex === 3
                    ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                    : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                }
                onClick={() => setNavIndex(3)}
              >
                <Message2 variant="Bold" size={18} /> Messages
              </NavLink>
              <NavLink
                // to={"/profile/account"}
                onClick={() => setNavIndex(4)}
                className={
                  navIndex === 4
                    ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                    : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                }
              >
                {" "}
                <ProfileCircle variant="Bold" size={18} /> Account
              </NavLink>
              <NavLink
                className={
                  navIndex === 5
                    ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                    : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                }
                onClick={() => setNavIndex(5)}
              >
                {" "}
                <FontAwesomeIcon icon={faQuestionCircle} size={18} /> Help &
                Support
              </NavLink>
            </nav>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 mt-6 p-6 border-t-[#AEBCC9] border-[1px]"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
          </button>
        </aside>
      </div>
      <div className="md:hidden flex justify-between p-4 w-full shadow-md">
        <h2 className="text-2xl font-bold text-primary ">
          <Link to="/">
            <img src="/Realestway horizontal.svg" alt="logo" width={220} />
          </Link>
        </h2>
        <span className="flex gap-2 items-center">
          <Notification color="#AEBCC9" variant="Bold" />{" "}
          <span className="items-center flex bg-[#AEBCC9] p-1 bg-opacity-10">
            <Profile color="#00A256" />
          </span>
          <HamburgerMenu color="#0A0D17" onClick={() => setOpen(!open)} />
        </span>
      </div>
      {open && (
        <div className="absolute z-[999] top-14 bg-white rounded-md right-0 p-1 md:hidden ">
          <span className="flex w-full justify-end pr-2 pb-2">
            <CloseCircle onClick={() => setOpen(false)} />
          </span>
          <nav className="space-y-4 px-6">
            <NavLink
              to={"/profile"}
              className={
                navIndex === 1
                  ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                  : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              }
              onClick={() => setNavIndex(1)}
            >
              <Element4 variant="Bold" size={18} /> Dashboard
            </NavLink>
            <NavLink
              to={"/profile/my-listings"}
              className={
                navIndex === 2
                  ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                  : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              }
              onClick={() => setNavIndex(2)}
            >
              <House variant="Bold" size={18} /> My Listings
            </NavLink>
            <NavLink
              to={"/profile/messages"}
              className={
                navIndex === 3
                  ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                  : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              }
              onClick={() => setNavIndex(3)}
            >
              <Message2 variant="Bold" size={18} /> Messages
            </NavLink>
            <NavLink
              to={"/profile/account"}
              onClick={() => setNavIndex(4)}
              className={
                navIndex === 4
                  ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                  : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              }
            >
              {" "}
              <ProfileCircle variant="Bold" size={18} /> Account
            </NavLink>
            <NavLink
              className={
                navIndex === 5
                  ? "flex items-center gap-2 text-white bg-[#00a256] px-4 py-2 rounded"
                  : "flex items-center gap-2 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
              }
              onClick={() => setNavIndex(5)}
            >
              {" "}
              <FontAwesomeIcon icon={faQuestionCircle} size={18} /> Help &
              Support
            </NavLink>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-600 mt-6 p-6 border-t-[#AEBCC9] border-[1px]"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AgentProfile;
