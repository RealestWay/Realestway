import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EmailVerified = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#100073] to-[#00A256] px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center animate-fade-in">
        <div className="animate-pulse-slow">
          <FontAwesomeIcon icon={faCheckCircle} size="4x" color="#00A256" />
        </div>
        <h2 className="text-2xl font-semibold text-[#100073] mt-4">
          Email Verified
        </h2>
        <p className="text-gray-600 mt-3">
          Your email has been successfully verified.
        </p>
        <p className="text-gray-600 mt-1">
          You can now log in and start using your account.
        </p>

        <a
          href="/login"
          className="inline-block mt-6 px-6 py-2 bg-[#00A256] text-white rounded-full shadow hover:bg-[#029e4d] transition duration-200"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default EmailVerified;
