import { CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const HouseRequestPopup = ({ open, setOpen }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    request_type: "renting",
    full_name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    property_type: "",
    city: "",
    state: "",
    additional_details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
    setSuccess(false); // reset success state
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        "https://backend.realestway.com/api/user-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      toast.success("Request submitted successfully!");
      setSuccess(true);
      setFormData({
        request_type: "renting",
        full_name: "",
        email: "",
        phone: "",
        property_type: "",
        city: "",
        state: "",
        additional_details: "",
      });
    } catch (error) {
      toast.error("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto scrollbar-hide scrollbar-hidden">
      {open ? (
        <div className="bg-white shadow-xl max-w-[95%] mx-auto rounded-2xl p-6 w-96 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {success ? "Request Submitted" : "Request a House"}
            </h2>
            <CloseCircle
              onClick={togglePopup}
              className="text-gray-400 hover:text-red-500 text-xl font-bold cursor-pointer"
            />
          </div>

          {success ? (
            <div className="text-center space-y-4 py-6">
              <p className="text-green-600 font-semibold">
                ✅ Your request has been submitted successfully!
              </p>
              <p className="text-gray-700 text-sm">
                We will work on your request as soon as possible and get back to
                you through your submitted contact details.
              </p>
              <button
                onClick={togglePopup}
                className="bg-[#100073] text-white px-5 py-2 rounded-lg mt-4"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Request Type
                </label>
                <select
                  name="request_type"
                  value={formData.request_type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="renting">I want to rent</option>
                  <option value="buying">I want to buy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <input
                  type="text"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City / Town
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  name="additional_details"
                  value={formData.additional_details}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#100073] hover:bg-[#120066] text-white py-2 rounded-lg font-medium disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      ) : (
        <motion.button
          onClick={togglePopup}
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 0 0px #00a256",
              "0 0 12px #00a256",
              "0 0 0px #00a256",
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-[#00a256] hover:bg-[#009246] text-white px-5 py-3 m-1 mt-4 rounded-full font-semibold"
        >
          <FontAwesomeIcon icon={faHouse} /> Request a House
        </motion.button>
      )}
    </div>
  );
};

export default HouseRequestPopup;
