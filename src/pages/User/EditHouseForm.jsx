import { useState } from "react";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";

const EditHouseForm = ({ house, isOpen, setIsOpen, setSelectedHouse }) => {
  const { updateHouse, isLoading } = UseHouses();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    ...house,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateHouse(house.id, token, ...formData);

    setIsOpen();
  };

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative overflow-hidden">
                <div className="bg-blue-600 text-white">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-red-600"
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold text-center mb-8 ">
                    Edit House Details
                  </h2>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                  {" "}
                  <form onSubmit={handleSubmit} className="grid gap-6">
                    {/* Title Input */}
                    <label className="text-xs text-gray-500 m-0">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter the property title"
                    />

                    {/* Property Type Selector */}
                    <label className="text-xs text-gray-500 m-0">
                      Property type
                    </label>
                    <select
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Property Type</option>
                      <option value="Self Contain">Self Contain</option>
                      <option value="1 Bedroom Apartment">
                        1 Bedroom Apartment
                      </option>
                      <option value="2 Bedroom Apartment">
                        2 Bedroom Apartment
                      </option>
                      <option value="3 Bedroom Apartment">
                        3 Bedroom Apartment
                      </option>
                      <option value="4 Bedroom Apartment">
                        4 Bedroom Apartment
                      </option>
                      <option value="Boysquarter">Boysquarter</option>
                      <option value="Duplex">Duplex</option>
                    </select>

                    {/* Location Input (Non-Editable) */}
                    <label className="text-xs text-gray-500 m-0">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Address"
                      disabled
                    />

                    {/* Description Textarea */}
                    <label className="text-xs text-gray-500 m-0">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the property in detail"
                    />

                    {/* Bedrooms & Bathrooms Inputs */}

                    <div className="flex gap-4">
                      <div>
                        <label className="text-xs text-gray-500 m-0">
                          Bedroom
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="No. of Bedrooms"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-500 m-0">
                          Bathroom
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="No. of Bathrooms"
                        />
                      </div>
                    </div>

                    {/* Price Breakdown Section */}
                    <h3 className="text-lg font-semibold text-gray-800">
                      Price Details (₦)
                    </h3>
                    <select
                      name="price_type"
                      value={formData.price_type}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Pricing Type</option>
                      <option value="daily">Daily</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="basicRent"
                        value={formData.basicRent}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Basic Rent"
                      />
                      <input
                        type="number"
                        name="cautionFee"
                        value={formData.cautionFee}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Caution Fee"
                      />
                      <input
                        type="number"
                        name="agentFee"
                        value={formData.agentFee}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Agent Fee"
                      />
                      <input
                        type="number"
                        name="otherFees"
                        value={formData.otherFees}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Other Fees"
                      />
                    </div>

                    {/* Total Price */}
                    <div className="text-lg font-bold text-gray-800">
                      Total Package:{" "}
                      <span className="text-green-600">
                        ₦
                        {(
                          (parseFloat(formData.basicRent) || 0) +
                          (parseFloat(formData.cautionFee) || 0) +
                          (parseFloat(formData.agentFee) || 0) +
                          (parseFloat(formData.otherFees) || 0)
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* Caretaker Contact */}
                    <label className="block font-semibold text-gray-700 text-lg">
                      Caretaker / Landlord's Details
                    </label>
                    <div className="sm:grid-cols-2 grid gap-4">
                      <input
                        type="text"
                        name="caretaker_contact"
                        value={formData.caretaker_contact}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter caretaker contact details"
                      />

                      <input
                        type="number"
                        name="caretaker_bankAcct"
                        value={formData.caretaker_bankAcct}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bank Account Number"
                      />
                      <input
                        type="text"
                        name="caretaker_bankName"
                        value={formData.caretaker_bankName}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bank Name"
                      />
                      <input
                        type="text"
                        name="caretaker_acctName"
                        value={formData.caretaker_acctName}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bank Account Name"
                      />
                    </div>

                    {/* Amenities Checkboxes */}
                    <h3 className="text-lg font-semibold text-gray-800">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Security",
                        "Gym",
                        "Running Water",
                        "Electricity",
                        "Wi-Fi",
                        "Parking Space",
                        "24/7 Power Supply",
                        "CCTV",
                        "Swimming Pool",
                      ].map((amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center text-gray-700"
                        >
                          <input
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              setFormData({
                                ...formData,
                                amenities: checked
                                  ? [...formData.amenities, value]
                                  : formData.amenities.filter(
                                      (amenity) => amenity !== value
                                    ),
                              });
                            }}
                            className="mr-2"
                          />
                          {amenity}
                        </label>
                      ))}
                    </div>

                    {/* Year Built */}
                    <input
                      type="date"
                      name="year_built"
                      value={formData.year_built}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Furnishing Status */}
                    <select
                      name="furnishing"
                      value={formData.furnishing}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Furnishing Status</option>
                      <option value="Not Furnished">Not Furnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>

                    <div className="flex justify-center gap-4 mt-6">
                      <button
                        type="submit"
                        className="p-4 bg-blue-600 text-white rounded-md w-full"
                      >
                        Update House
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          setSelectedHouse({});
                        }}
                        className="p-4 bg-gray-600 text-white rounded-md w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditHouseForm;
