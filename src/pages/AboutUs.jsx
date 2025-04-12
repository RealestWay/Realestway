import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import {
  faCheckCircle,
  faCreditCard,
  faGraduationCap,
  faHandshake,
  faHouseChimney,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons/faUserGraduate";

const AboutUs = () => {
  return (
    <div className="bg-[url('/house-bg.jpg')] bg-contain">
      <PageNav />

      <h1 className="text-5xl font-extrabold text-center text-[#100073]">
        About Us
      </h1>
      <div className="bg-white px-6 sm:px-12 py-12 max-w-6xl mx-auto text-justify text-gray-800 space-y-16 font-sans">
        <section className="space-y-4 text-lg leading-relaxed">
          <p>
            At <strong>Realestway</strong>, we believe finding your ideal home
            should not be a stressful or time-consuming journey. That is why we
            have reimagined the traditional home search to make it smarter,
            faster, and more personalized. Our drive is simple; to eliminate the
            hassle of endless viewings, scattered listings, and overwhelming
            choices. With a combo of technology and expert guidance, we connect
            you with homes that truly match your lifestyle, needs, and budget
            without the guesswork. Whether you are buying, renting, or just
            exploring your options, we are here to simplify every step. Just
            think of us as your trusted partner in the home-hunting process,
            working behind the scenes to make sure your next move is smooth,
            simple, and tailored to you. Allow us to take the stress out of your
            search and help you find a place you will love to call home.
          </p>
        </section>

        {/* Mission */}
        <section className="bg-white shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            We are committed to revolutionizing the real estate industry by
            optimizing every aspect of the experience. Our mission is to provide
            seamless, accessible, and transparent solutions that empower buyers,
            sellers, tenants, and property owners alike. Through innovative
            tools, reliable insights, and a trustworthy platform, we simplify
            transactions and enhance the journey for all involved.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Our Vision
          </h2>
          <p className="text-lg leading-relaxed">
            To be the leading real estate platform that transforms how people
            find, rent, buy, sell and invest in properties—making housing and
            real estate services more accessible, efficient, and fair for all.
          </p>
        </section>

        {/* Why Realestway */}
        <section className="bg-white shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-4">
            Why Realestway?
          </h2>
          <ul className="space-y-4 text-lg">
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[#00A256] mt-1"
              />
              <span>
                <strong>Verified Agents & Listings</strong> – Every agent is
                verified. Every house is as you see it.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon
                icon={faMobile}
                className="text-[#00A256] mt-1"
              />
              <span>
                <strong>User-Friendly Platform</strong> – Filter by location,
                price, type, and more.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-[#00A256] mt-1"
              />
              <span>
                <strong> Safe Payments</strong> – Secure flow with transparent
                fee breakdowns.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-[#00A256] mt-1"
              />
              <span>
                <strong> Support & Dispute Resolution</strong> – Fast help and
                fair dispute process.
              </span>
            </li>
          </ul>
        </section>

        {/* Who We Serve */}
        <section>
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Who We Serve
          </h2>
          <ul className="space-y-2 text-lg">
            <li>
              <strong>
                <FontAwesomeIcon icon={faGraduationCap} color="green" />{" "}
                Students
              </strong>{" "}
              – Freshers, returnees, NYSC members, and postgrads.
            </li>
            <li>
              <strong>
                {" "}
                <FontAwesomeIcon icon={faUserGraduate} color="green" /> Mobile
                Professionals
              </strong>{" "}
              – Relocating for jobs, contracts, or internships.
            </li>
            <li>
              <strong>
                {" "}
                <FontAwesomeIcon icon={faHouseChimney} color="green" />{" "}
                Landlords & Agents
              </strong>{" "}
              – Verified listers seeking genuine tenants.
            </li>
          </ul>
        </section>

        {/* How We Started */}
        <section>
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            How We Started
          </h2>
          <p className="text-lg leading-relaxed">
            Realestway was born from a real struggle—finding decent housing far
            from home. Tired of slow processes, scams, and vague listings, we
            created a platform to bring trust and speed to relocation and
            housing.
          </p>
        </section>

        {/* Core Values */}
        <section className="bg-white shadow-md shadow-[#100073] rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Our Core Values
          </h2>
          <ul className="space-y-2 text-lg list-disc list-inside">
            <li>
              <strong>Trust</strong> – We verify everything and everyone.
            </li>
            <li>
              <strong>Empathy</strong> – Built by those who have lived the
              problem.
            </li>
            <li>
              <strong>Innovation</strong> – We rethink renting every day.
            </li>
            <li>
              <strong>Transparency</strong> – No hidden charges, just real data.
            </li>
            <li>
              <strong>Community</strong> – We grow with the community we serve.
            </li>
          </ul>
        </section>

        {/* Join Us */}
        <section>
          <h2 className="text-3xl font-semibold text-[#00A256] mb-2">
            Join Us
          </h2>
          <p className="text-lg leading-relaxed">
            Realestway is more than a product— it is a movement to revolutionize
            housing for students, young professionals and everyone. Whether you
            are searching, buying, renting, listing, or just exploring, welcome
            to Realestway—
            <strong> the smarter way to rent, buy and sell.</strong>{" "}
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
