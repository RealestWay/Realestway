import { useState } from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Spinner2 from "../components/Spinner2";

const AgentEnrollmentPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    nin: "",
    address: "",
  });
  // console.log(user, token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Delete user to reg as agent
  // const handleUserDelete = async (userId) => {
  //   try {
  //     const res = await fetch(
  //       `https://backend.realestway.com/api/users/${userId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`, // Auth token here
  //         },
  //       }
  //     );
  //   } catch {
  //     return null;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://backend.realestway.com/api/agents",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! You can now log in.");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 pt-2 min-h-screen">
      <PageNav />
      <div className="container mx-auto sm:px-4 md:px-12 py-5 animate-fade-in">
        {/* Intro Section */}
        <section className="mb-12 text-center bg-blue-50 p-6 rounded-lg shadow-md text-gray-800">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Join Our Real Estate Network
          </h2>
          <p className="leading-relaxed mb-6 text-justify">
            At Realestway, we are committed to creating a strong network of real
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
            <Link to={"/about"} className="text-indigo-600 hover:underline">
              About Us
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Enrollment Form Section */}
        {!success ? (
          <section className="mb-12 flex justify-center">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Agent Enrollment
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Please provide your email and phone number to get started in our
                agent recruitment process:
              </p>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto"
              >
                {/* Fullname Field */}
                <div className="mb-4">
                  <label htmlFor="fullname" className="block text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {/* Fullname Field */}
                <div className="mb-4">
                  <label htmlFor="comapnyName" className="block text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* NIN Field */}
                <div className="mb-4">
                  <label htmlFor="nin" className="block text-gray-700">
                    National ID Number (NIN)
                  </label>
                  <input
                    type="text"
                    id="nin"
                    name="nin"
                    value={formData.nin}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />{" "}
                  {/* <button type="button" onClick={() => verifyNin(formData.nin)}>
            verify
          </button> */}
                </div>

                {/* Address Field */}
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
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
