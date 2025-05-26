import React from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

const ServicesAndFacilities = () => {
  return (
    <div>
      <PageNav />
      <div className="min-h-screen bg-[#f9f9f9] px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-10 text-gray-800">
          <h1 className="text-4xl font-bold text-[#100073] text-center mb-8">
            Our Services & Facilities
          </h1>

          <p className="mb-6 text-lg">
            At <strong>Realestway</strong>, we offer a seamless digital platform
            for property rentals and management — tailored to meet the needs of
            both tenants and landlords. We’re building a modern ecosystem for
            Nigeria’s real estate future.
          </p>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            🔑 Rental Services
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>
              Verified property listings for residential and commercial use.
            </li>
            <li>
              Direct landlord/caretaker/agent-to-tenant communication (chat/call
              features).
            </li>
            <li>Secure booking and online rental payments.</li>
            <li>Flexible short-let and long-term rental options.</li>
          </ul>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            📊 For Landlords & Agents
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Easy property uploading and listing dashboard.</li>
            <li>Booking calendar and inquiry notifications.</li>
            <li>
              Digital contracts, rental history, and performance analytics.
            </li>
          </ul>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            🏗 Future Facilities
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Property sales portal (coming soon).</li>
            <li>Real estate investment and co-ownership programs.</li>
            <li>Mortgage and financing tools (in progress).</li>
            <li>Property management services for landlords.</li>
          </ul>

          <h2 className="text-[#00A256] text-xl font-semibold mt-8">
            🌍 Community Support
          </h2>
          <ul className="list-disc ml-6 mt-2">
            <li>24/7 customer support via chat, email, and phone.</li>
            <li>Onboarding for new users and property owners.</li>
            <li>Regular training webinars and workshops.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesAndFacilities;
