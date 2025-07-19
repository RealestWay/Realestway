import { CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const HouseRequestPopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    budget: "",
    houseType: "",
    location: "",
    phone: "",
    email: "",
  });

  const togglePopup = () => setOpen(open);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request Submitted:", formData);
    // TODO: Send request to backend API
    alert("Request submitted successfully!");
    setOpen(false);
    setFormData({
      budget: "",
      houseType: "",
      location: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-80 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              House Request
            </h2>
            <CloseCircle
              onClick={togglePopup}
              className="text-gray-400 hover:text-red-500 text-xl font-bold"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700"
              >
                Budget
              </label>
              <input
                id="budget"
                type="text"
                name="budget"
                placeholder="e.g. ₦300k"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="houseType"
                className="block text-sm font-medium text-gray-700"
              >
                House Type
              </label>
              <input
                id="houseType"
                type="text"
                name="houseType"
                placeholder="e.g. Self-contain"
                value={formData.houseType}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="e.g. UNILAG area"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="e.g. 08012345678"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="e.g. you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#100073] hover:bg-[#120066] text-white py-2 rounded-lg font-medium"
            >
              Submit Request
            </button>
          </form>
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
          className="bg-[#00a256] hover:bg-[#009246] text-white px-5 py-3 rounded-full font-semibold"
        >
          <FontAwesomeIcon icon={faHouse} /> Request a House
        </motion.button>
      )}
    </div>
  );
};

export default HouseRequestPopup;
