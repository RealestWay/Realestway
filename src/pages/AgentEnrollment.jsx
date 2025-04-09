import { useState } from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const AgentEnrollmentPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (you can add your API request or state handling here)
    setFormSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <PageNav />
      <div className="container mx-auto px-12 py-8">
        {/* Intro Section */}
        <section className="mb-12 text-center bg-blue-50 p-6 rounded-lg shadow-md text-gray-800">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Join Our Real Estate Network
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-justify">
            At RealEstWay, we are committed to creating a strong network of real
            estate agents who share our passion for excellence and customer
            satisfaction. Our vision is to revolutionize the real estate
            experience, making it easier for buyers and renters to find their
            perfect homes while providing agents with the tools and support they
            need to succeed.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-justify">
            Our mission is to provide innovative solutions for both agents and
            clients, fostering long-term relationships built on trust and
            professionalism.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-justify">
            Learn more about us and our story on our{" "}
            <Link to={"/AboutUs"} className="text-indigo-600 hover:underline">
              About Us
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Enrollment Form Section */}
        {!formSubmitted ? (
          <section className="mb-12 flex justify-center">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Agent Enrollment
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Please provide your email and phone number to get started in our
                agent recruitment process:
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <FontAwesomeIcon icon={faEnvelope} color="#5A67D8" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-3 pl-12 pr-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <FontAwesomeIcon icon={faPhone} color="#5A67D8" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full py-3 pl-12 pr-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-gray-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Enroll Now
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Thank You for Enrolling!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We have received your information. You will be contacted soon with
              the next steps in the recruitment process.
            </p>
            <p className="text-lg text-gray-600">
              For more details, you can{" "}
              <Link
                to="/recruitment-process"
                className="text-indigo-600 hover:underline"
              >
                view the full instructions
              </Link>
              .
            </p>
          </section>
        )}

        {/* Instructions Section */}
        <section className="mb-12 text-center bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Recruitment Process
          </h2>
          <p className="text-lg text-gray-600 mb-4 text-justify">
            Once you submit your enrollment, we will contact you through your
            details and guide you through the next steps in our recruitment
            process. You will receive an email with further instructions on how
            to proceed.
          </p>
          <p className="text-lg text-gray-600 text-justify">
            For more details about the recruitment process, click here to{" "}
            <Link
              to="/recruitment-process"
              className="text-green-600 hover:underline"
            >
              view the full instructions
            </Link>
            .
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AgentEnrollmentPage;
