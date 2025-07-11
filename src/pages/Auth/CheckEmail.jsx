import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#100073] to-[#00A256] px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center">
        <div className="animate-pulse-slow">
          {" "}
          <FontAwesomeIcon icon={faMailBulk} size={30} color="#100073" />
        </div>
        <h2 className="text-2xl font-semibold text-[#100073] mt-4">
          Check Your Email
        </h2>
        <p className="text-gray-600 mt-3">
          We've sent a verification link to your email address.
        </p>
        <p className="text-gray-600 mt-1">
          Please check your inbox or <b>SPAM folder(Report not Spam)</b> and
          click the link to verify your account.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          Didn’t receive the email? <br />
          Recheck your input mail and{" "}
          <span className="text-[#00A256] font-medium cursor-pointer hover:underline">
            <Link to={"/check-email"}>Resend</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
