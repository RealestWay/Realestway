import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#100073] text-white mt-10 px-5 sm:px-20 pt-20 h-1/3 sm:flex-col justify-between">
      <Link to={"/onboard"} className="w-2/3 flex justify-end m-auto mr-0">
        Become An Agent
      </Link>
      <div className="sm:flex justify-center items-center">
        <div className="sm:w-3/5 w-5/6 pl-38 mb-20">
          <h3 className="text-4xl mb-5">Newsletter & Special Promo</h3>
          <input
            placeholder="Enter your email here"
            className="p-3 text-sm rounded-sm w-3/5 text-black focus:outline-none"
          />
          <button className="relative p-3 text-white bg-blue-300 text-sm rounded-0 rounded-r ml-[-20px]">
            SubScribe
          </button>
        </div>

        <div className="flex justify-around w-full sm:w-2/5">
          <div>
            <p>About us</p>
            <p>Contact</p>
            <p>Location</p>
          </div>
          <div>
            <p>FAQ</p>
            <p>Term of use</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <p>Service & Facilities</p>
            <p>Careers</p>
            <p>How to book</p>
          </div>
        </div>
      </div>
      <p className="flex justify-center p-4">
        &copy; Copyright {new Date().getFullYear()} by RealestWay
      </p>
    </div>
  );
};

export default Footer;
