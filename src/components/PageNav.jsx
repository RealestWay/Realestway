import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

const PageNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full my-10 px-50 h-20 ">
      <ul className="shadow flex min-h-12 py-2 p-3 w-2/3 m-auto bg-white text-black rounded-2xl border border-gray-700 border-1">
        <div>
          <FontAwesomeIcon icon={faHouseChimney} color="green" />
          <span className="text-xl font-bold text-blue-700">R</span>
          <span className="text-2xl font-bold text-blue-600">e</span>
          <span className="text-3xl font-bold text-blue-500">a</span>
          <span className="text-4xl font-bold text-blue-400">l</span>
          <span className="text-3xl font-bold text-green-700">E</span>
          <span className="text-2xl font-bold text-green-600">s</span>
          <span className="text-xl font-bold text-green-500">t</span>
        </div>
        <div className="justify-between flex w-4/5 ml-10 items-center">
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li>
            <NavLink to="/AboutUs">About</NavLink>
          </li>
          <li>
            <NavLink to="/ContactUs">Contact Us</NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <NavLink to="/Profile">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </NavLink>
            </li>
          ) : (
            <li className="bg-blue-600 py-2 px-4 rounded-xl text-white">
              <NavLink to="/SignIn">SignIn</NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default PageNav;
