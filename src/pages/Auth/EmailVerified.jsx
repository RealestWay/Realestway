import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EmailVerified = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const hash = query.get("hash");
  const [success, setSuccess] = useState("");
  async function verifyEmail() {
    try {
      const res = await fetch(
        `https://backend.realestway.com/api/email/verify/${id}/${hash}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();
      setSuccess(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (id && hash) verifyEmail();
  }, [id, hash]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#100073] to-[#00A256] px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center animate-fade-in">
        <div className="animate-pulse-slow">
          <FontAwesomeIcon icon={faCircleCheck} size="lg" color="#00A256" />
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
          className="inline-block mt-6 px-6 py-2 text-white bg-gradient-to-r from-[#100073] to-[#00a256] rounded-full shadow transition duration-200"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default EmailVerified;
