import React from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

const Careers = () => {
  return (
    <div>
      <PageNav />
      <div className="min-h-screen bg-[#f9f9f9] px-4 ">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-10 text-gray-800">
          <h1 className="text-4xl font-bold text-[#100073] text-center mb-8">
            Join the Realestway Team
          </h1>

          <p className="mb-6 text-lg">
            Realestway is shaping the future of real estate across Africa. We
            believe in using technology to solve big housing challenges — from
            rentals to ownership.
          </p>

          <h2 className="text-[#00A256] text-xl font-semibold">
            🌱 Why Work With Us?
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Build impact-driven tech for millions of Nigerians.</li>
            <li>Flexible, remote-friendly working culture.</li>
            <li>Fast-paced, innovation-led team culture.</li>
            <li>Competitive pay, equity options, and growth support.</li>
          </ul>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            🚀 Roles We Hire For
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Frontend & Full-Stack Developers</li>
            <li>Product Designers (UI/UX)</li>
            <li>Customer Success & Support Reps</li>
            <li>Real Estate Relationship Managers</li>
            <li>Marketing & Growth Specialists</li>
          </ul>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            📩 Open Applications
          </h2>
          {/* <p className="mt-2">
            Don’t see an open role but want to join us? Send your CV and
            portfolio to{" "}
            <a
              href="mailto:careers@realestway.com"
              className="text-[#100073] underline"
            >
              careers@realestway.com
            </a>{" "}
            and tell us how you can make a difference.
          </p> */}
          <p className="mt-2">Watch Out!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
