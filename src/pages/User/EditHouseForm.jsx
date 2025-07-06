import { useState } from "react";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";
import Spinner2 from "../../components/Spinner2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SuccessPopup from "../../components/SuccessPopUp";

const EditHouseForm = ({ onClose, house }) => {
  const { fetchHouses, fetchAgentHouses } = UseHouses();
  const { token, user } = useAuth();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const [formData, setFormData] = useState({
    title: house?.title,
    address: house?.location.address,
    description: house?.description,
    bedrooms: house?.bedrooms,
    bathrooms: house?.bathrooms,
    dimension: house?.dimension,
    property_type: house?.propertyType,
    year_built: house?.yearBuilt,
    furnishing: house?.furnishing,
    caretaker_contact: house?.caretakerContact,
    caretaker_acc_number: house?.caretakerAccount.number,
    caretaker_bank_name: house?.caretakerAccount.bankName,
    caretaker_acc_name: house?.caretakerAccount.name,
    pricing_type: house?.priceType,
    min_tenancy_period: Number(house?.minTenancyPeriod.split(" ")[0]),
    amenities: house?.amenities,
  });

  const [priceBreakdown, setPriceBreakdown] = useState({
    basicRent: house?.priceBreakdown?.basicRent,
    cautionFee: house?.priceBreakdown?.cautionFee,
    agentFee: house?.priceBreakdown?.agentFee,
    agreementFee: house?.priceBreakdown?.agreementFee,
  });

  const total_price = Object.values(priceBreakdown)
    .filter((val) => val !== "")
    .reduce((sum, val) => sum + parseFloat(val || 0), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setPriceBreakdown({
      ...priceBreakdown,
      [e.target.name]: e.target.value ? parseFloat(e.target.value) : "",
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      amenities: checked
        ? [...prevData.amenities, value]
        : prevData.amenities.filter((amenity) => amenity !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    setIsSubmitting(true);
    // Append all form fields
    Object.entries({
      ...formData,
      basic_rent: priceBreakdown.basicRent,
      caution_fee: priceBreakdown.cautionFee,
      agent_fee: priceBreakdown.agentFee,
      agreement_fee: priceBreakdown.agreementFee,
      amenities: formData.amenities.join(", "),
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });
    data.append("_method", "PATCH");
    try {
      // Debug: Log FormData contents
      // for (let [key, value] of data.entries()) {
      //   console.log(key, value);
      // }

      const res = await fetch(
        `https://backend.realestway.com/api/listings/${house?.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Failed to submit property");
      }

      const result = await res.json();
      setSuccessMessage("Property updated successfully!");

      // Refresh house data
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit, please try again");
    } finally {
      setIsSubmitting(false);
      fetchHouses();
      fetchAgentHouses();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      {successMessage && (
        <SuccessPopup message={successMessage} onClose={setSuccessMessage} />
      )}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Upload Property</h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              onClick={() => {
                fetchHouses();
                fetchAgentHouses(user?.id);
              }}
            />
          </button>
        </div>

        <div className="p-6">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <input
                type="text"
                name="title"
                placeholder="Property Title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <select
                required
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Property Type</option>
                <option value="Self Contain">Self Contain</option>
                <option value="Office">Office</option>
                <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
                <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
                <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
                <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
                <option value="Boysquarter">Boysquarter</option>
                <option value="Duplex">Duplex</option>
              </select>

              <input
                required
                type="text"
                name="address"
                placeholder="Property Address"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                name="description"
                placeholder="Property Description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={formData.bedrooms || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={formData.bathrooms || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="year_built"
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.year_built}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 2022"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Dimensions
                  </label>
                  <input
                    required
                    type="text"
                    name="dimension"
                    placeholder="e.g., 1200 sq ft"
                    value={formData.dimension}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Furnishing
                  </label>
                  <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Furnishing</option>
                    <option value="not-furnished">Not Furnished</option>
                    <option value="furnished">Furnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Min. Tenancy
                  </label>
                  <select
                    name="min_tenancy_period"
                    value={formData.min_tenancy_period}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Period</option>
                    <option value={1}>1 month</option>
                    <option value={6}>6 months</option>
                    <option value={12}>1 year</option>
                    <option value={24}>2 years</option>
                    <option value={36}>3 years</option>
                    <option value={60}>5 years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Price Details (₦)</h3>
              <select
                name="pricing_type"
                value={formData.pricing_type}
                onChange={handleInputChange}
                required
                className="border border-gray-300 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Pricing Type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="basicRent"
                  placeholder="Basic Rent"
                  value={priceBreakdown.basicRent}
                  onChange={handlePriceChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  name="cautionFee"
                  placeholder="Caution Fee"
                  value={priceBreakdown.cautionFee}
                  onChange={handlePriceChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="agentFee"
                  placeholder="Agent Fee"
                  value={priceBreakdown.agentFee}
                  onChange={handlePriceChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="agreementFee"
                  placeholder="Agreement"
                  value={priceBreakdown.agreementFee}
                  onChange={handlePriceChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4 text-lg font-bold">
                Total Package:{" "}
                <span className="text-green-600">
                  ₦{total_price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Caretaker/Landlord Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="caretaker_contact"
                  placeholder="Phone Number"
                  value={formData.caretaker_contact}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  name="caretaker_acc_number"
                  placeholder="Account Number"
                  value={formData.caretaker_acc_number}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="caretaker_bank_name"
                  placeholder="Bank Name"
                  value={formData.caretaker_bank_name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="caretaker_acc_name"
                  placeholder="Account Name"
                  value={formData.caretaker_acc_name}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            {/* Images / Video edit can come in later here */}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Additional Features
              </h3>
              <p className="text-red-600 pb-2">
                Select only amenity(ies) you want to add to the existing ones
                for the property, else unselect all.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "Parking Space",
                  "24-7 Power",
                  "Balcony",
                  "CCTV",
                  "Gated Compound",
                  "Security",
                  "Borehole-Running Water",
                  "POP Ceiling",
                  "Prepaid Meter",
                  "Wardrobe",
                  "Kitchen Cabinets",
                  "Air Conditioning",
                  "Inverter - Solar Backup",
                  "Fenced Compound",
                  "Tiled Floor",
                  "Elevator - Lift",
                  "Swimming Pool",
                  "Gym",
                  "Wi-Fi Ready",
                  "Visitors Toilet",
                  "Ensuite Rooms",
                ].map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={handleCheckboxChange}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            {successMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="mt-8 flex justify-center items-center flex-col">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-4/5 bg-[#00a256] hover:bg-[#1b553a] text-white font-bold py-3 px-4 rounded-md transition duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Spinner2 className="mr-2" />
                    Submitting...
                  </span>
                ) : (
                  "Update Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHouseForm;
