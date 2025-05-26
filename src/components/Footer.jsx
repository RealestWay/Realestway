import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#100073] text-white mt-10 px-5 sm:px-20 pt-20 h-1/3 sm:flex-col justify-between">
      <Link
        to={"/onboard"}
        className="w-2/3 flex justify-end m-auto mr-0 mb-10 sm:mb-1"
      >
        Become An Agent
      </Link>
      <div className="sm:flex justify-center items-center">
        <div className="sm:w-3/5 w-5/6 pl-38 mb-20">
          <h3 className="text-4xl mb-5">Newsletter & Special Promo</h3>
          <div className="flex ">
            <input
              placeholder="Enter your email here"
              className="p-3 text-sm rounded-sm w-3/5 text-black focus:outline-none border-5 rounded-r-none border-white"
            />
            <button className="p-3 font-montserrat text-white bg-[#00A256] text-sm rounded-0 rounded-r border-0">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex justify-around w-full sm:w-2/5">
          <div>
            <p>
              <Link to={"/about"}>About us</Link>
            </p>
            <p>
              <Link to={"/contact"}>Contact</Link>
            </p>
            <p>
              <Link to={"/contact"}>Location</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to={"/faqs"}>FAQ</Link>
            </p>
            <p>
              <Link to={"/terms"}>Term of use</Link>
            </p>
            <p>
              <Link to={"/privacy"}>Privacy Policy</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to={"/services"}>Service & Facilities</Link>
            </p>
            <p>
              <Link to={"/careers"}>Careers</Link>
            </p>
            <p>
              {" "}
              <Link to={"/onboard"}>Become An Agent</Link>
            </p>
          </div>
        </div>
      </div>
      <p className="flex justify-center p-4">
        &copy; Copyright {new Date().getFullYear()} by Realestway
      </p>
    </div>
  );
};

export default Footer;
