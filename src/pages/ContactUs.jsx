import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import {
  faEnvelope,
  faHouseLaptop,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const ContactUs = () => {
  return (
    <div className="bg-[url('/house-bg.jpg')] bg-repeat">
      <PageNav />

      <h1 className="text-5xl font-extrabold text-center text-[#100073]">
        Contact Us
      </h1>
      <div className="bg-white sm:flex justify-around gap-2 px-12 py-12 max-w-6xl mx-auto text-justify text-[#100073] font-sans">
        <section className="bg-white mb-3 sm:w-[33%] shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Head Office
          </h2>
          <p className="text-lg leading-relaxed">
            <FontAwesomeIcon icon={faHouseLaptop} /> 36 Olusesi Street, Eputu,
            Ibeju-Lekki, Lagos, Nigeria.
          </p>
        </section>
        <section className="bg-white mb-3 sm:w-[33%] shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Contacts
          </h2>
          <div className="text-lg leading-relaxed">
            <p>
              <FontAwesomeIcon icon={faPhone} color="green" /> +2348120606547
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} color="green" /> +2348102349094
            </p>
          </div>
        </section>
        <section className="bg-white mb-3 sm:w-[33%] shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Handles
          </h2>
          <div className="text-lg block leading-relaxed">
            <p>
              <FontAwesomeIcon icon={faFacebook} /> Realestway
            </p>
            <p>
              <FontAwesomeIcon icon={faXTwitter} /> @realestway
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> support@realestway.com
            </p>
            <p>
              <FontAwesomeIcon icon={faInstagram} /> @realestway_1
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
