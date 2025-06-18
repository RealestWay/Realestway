import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Facebook, Instagram, Send2 } from "iconsax-reactjs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="w-5/6 mx-auto my-10">
        <h2 className="text-2xl mb-4">
          Become a Real Estate Agent on Realestway
        </h2>
        <span className="md:flex md:justify-between flex flex-col md:flex-row gap-5">
          <p className="sm:w-3/5 flex justify-evenly w-full">
            List your properties, connect with verified renters and buyers, and
            grow your real estate business with the support of our trusted
            platform.
          </p>
          <button className="p-3 px-7 text-white bg-[#00a256] rounded">
            <Link to={"/onboard"}> Get Started</Link>
          </button>
        </span>
      </div>
      <div className="border-[#100073] border-y-[1px] mt-10 px-5 sm:px-20 pt-20 h-1/3 sm:flex-col justify-between">
        <div className="sm:flex justify-center items-center">
          <div className="sm:w-2/5 w-full pl-38 mb-20">
            <img
              src="/Realestway horizontal.svg"
              alt="horizontal-logo"
              width={300}
            />
            <p className="sm:w-3/5 w-full">
              36, Olusesi street, Eputu, Ibeju-Lekki, Lagos, Nigeria{" "}
            </p>
            <h3 className="mt-5">Subscribe to our newsletter</h3>
            <div className="flex relative w-full sm:w-3/5 items-end">
              <input
                placeholder="Enter your email here"
                className="p-3 text-sm rounded-xl w-full text-black bg-[#EFF0FF] border-[1px] border-[#100073] focus:outline-none"
              />
              <button className="p-3 absolute right-2">
                <Send2 size={20} variant="Bold" color="#00a256" />
              </button>
            </div>
          </div>

          <div className="flex gap-3 justify-around w-full sm:w-3/5 mb-24">
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-gray-500">Quick Links</p>
              <p>
                <Link to={"/"}>Home</Link>
              </p>
              <p>
                <Link to={"/about"}>About us</Link>
              </p>
              <p>
                <Link to={"/onboard"}>Become an Agent</Link>
              </p>

              <p>
                <Link to={"/contact"}>Explore Locations</Link>
              </p>
              <p>
                <Link to={"/contact"}>Contact Us</Link>
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <p className="text-gray-500">Resources</p>
              <p>
                <Link to={"/faqs"}>FAQ</Link>
              </p>
              <p>
                <Link to={"/"}>Blogs</Link>
              </p>
              <Link to={"/careers"}>Careers</Link>
              <p>
                <Link to={"/privacy"}>Privacy Policy</Link>
              </p>
              <p>
                <Link to={"/terms"}>Terms of Service</Link>
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-gray-500">Contacts</p>
              <p>support@realestway.com</p>
              <p>+2348120606547</p>
              <p>+2348102349094</p>
              <span className="flex gap-3 justify-between items-center">
                <a href={"https://x.facebook/realestway"} target="_blank">
                  <Facebook variant="Bold" color="#00a256" size={18} />
                </a>
                <a href={"https://x.com/realestway"} target="_blank">
                  {" "}
                  <FontAwesomeIcon icon={faX} color="#00a256" />
                </a>
                <a href={"https://instagram.com/realestway_1"} target="_blank">
                  {" "}
                  <Instagram color="#00a256" size={18} />
                </a>

                <Link to={"/"}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color="#00a256"
                    size={18}
                  />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
      <p className="flex justify-center p-4 text-[#100073] font-bold">
        &copy; Copyright {new Date().getFullYear()} by Realestway
      </p>
    </div>
  );
};

export default Footer;
