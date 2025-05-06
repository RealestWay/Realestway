import { useState } from "react";
import { getCurrentLocation } from "../../service/getLocation";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";

const HouseUploadForm = () => {
  const { fetchHouses } = UseHouses();
  const { token } = useAuth();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    dimension: "",
    property_type: "",
    year_build: "",
    furnishing: "",
    caretaker_contact: "",
    caretaker_bankAcct: "",
    caretaker_bankName: "",
    caretaker_acctName: "",
    pricing_type: "",
    date_listed: new Date().toISOString(),
    min_tenancy_period: "",
    amenities: [],
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    error: "",
  });
  const fetchLocation = async () => {
    try {
      const data = await getCurrentLocation();
      setLocationData({
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        error: "",
      });
    } catch (error) {
      setLocationData({
        ...locationData,
        error: error,
      });
    }
  };

  const [priceBreakdown, setPriceBreakdown] = useState({
    basicRent: "",
    cautionFee: "",
    agentFee: "",
    otherFees: "",
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 20) {
      alert("Maximum of 20 images allowed!");
      return;
    }
    setImages([...images, ...files]);
  };

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationData) {
      setError("Please record the house location");
      return;
    }

    try {
      const res = await fetch("https://backend.realestway.com/api/listings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          location_address: locationData.address,
          city: locationData.city,
          state: locationData.state,
          zip_code: locationData.zipCode,
          basic_rent: priceBreakdown.basicRent,
          caution_fee: priceBreakdown.cautionFee,
          agent_fee: priceBreakdown.agentFee,
          other_fees: priceBreakdown.otherFees,
          images,
          video,
        }),
      });

      if (!res.ok) throw new Error("Failed to create account");
    } catch (err) {
      setError("There was an error signing up. Please try again.");
    } finally {
      alert("Form Submitted Successfully!");

      // Reset form
      setFormData({
        title: "",
        address: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        dimension: "",
        property_type: "",
        year_built: "",
        furnishing: "",
        caretaker_contact: "",
        pricing_type: "",
        date_listed: "",
        amenities: [],
        caretaker_bankAcct: "",
        caretaker_bankName: "",
        caretaker_acctName: "",
      });
      setImages([]);
      setVideo(null);
      setLocationData({
        ...locationData,
        latitude: null,
        longitude: null,
        city: "",
      });
      setPriceBreakdown({
        basicRent: "",
        cautionFee: "",
        agentFee: "",
        otherFees: "",
      });
    }
    fetchHouses();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Upload House Details
      </h2>
      {locationData.error && (
        <p className="text-red-500">{locationData.error}</p>
      )}
      <div className="w-full flex">
        <button
          className="p-4 rounded-md w-full sm:w-1/3 m-auto bg-slate-600 text-white font-semibold text-lg"
          onClick={fetchLocation}
        >
          {locationData.latitude ? "Location Saved" : "Record Location"}
        </button>
      </div>
      {locationData.latitude ? (
        <p className="text-sm text-green-600 flex w-full justify-center my-2">
          Location recorded! You can continue...
        </p>
      ) : (
        <p className="text-sm text-red-600 flex w-full justify-center my-2">
          Click to submit location before you proceed
        </p>
      )}

      {locationData.latitude && (
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Title Input */}
          <input
            type="text"
            name="title"
            placeholder="Enter the property title"
            value={formData.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Property Type Selector */}
          <select
            required
            name="property_type"
            value={formData.property_type}
            onChange={handleInputChange}
            className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Property Type</option>
            <option value="Self Contain">Self Contain</option>
            <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
            <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
            <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
            <option value="4 Bedroom Apartment">4 Bedroom Apartment</option>
            <option value="Boysquarter">Boysquarter</option>
            <option value="Duplex">Duplex</option>
          </select>

          {/* Location Input */}
          <input
            required
            type="text"
            name="address"
            placeholder="Enter the address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description Textarea */}
          <textarea
            name="description"
            placeholder="Describe the property in detail"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-4 rounded-md w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Bedrooms & Bathrooms Inputs */}
          <div className="flex gap-4">
            <input
              type="number"
              name="bedrooms"
              placeholder="No. of Bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="No. of Bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price Breakdown Section */}
          <h3 className="text-lg font-semibold text-gray-800">
            Price Details (₦)
          </h3>
          <select
            name="pricing_type"
            value={formData.pricing_type}
            onChange={handleInputChange}
            required
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
              placeholder="Basic Rent"
              value={priceBreakdown.basicRent}
              onChange={handlePriceChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="cautionFee"
              placeholder="Caution Fee"
              value={priceBreakdown.cautionFee}
              onChange={handlePriceChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="agreementFee"
              placeholder="Agreement Fee"
              value={priceBreakdown.agreementFee}
              onChange={handlePriceChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="agentFee"
              placeholder="Agent Fee"
              value={priceBreakdown.agentFee}
              onChange={handlePriceChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Total Price */}
          <div className="text-lg font-bold text-gray-800">
            Total Package:{" "}
            <span className="text-green-600">
              ₦{total_price.toLocaleString()}
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
              placeholder="Enter contact details(phone Number)"
              value={formData.caretaker_contact}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="caretaker_bankAcct"
              placeholder="Bank Account Number"
              value={formData.caretaker_bankAcct}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="caretaker_bankName"
              placeholder="Bank Name"
              value={formData.caretaker_bankName}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="caretaker_acctName"
              placeholder="Bank Account Name"
              value={formData.caretaker_acctName}
              onChange={handleInputChange}
              className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amenities Checkboxes */}
          <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
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
              <label key={amenity} className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>

          {/* Year Built, Furnishing, and Dimensions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-xs">Year Built:</label>
              <input
                type="date"
                name="year_built"
                value={formData.year_built}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs">
                Mininum Rent Period:
              </label>
              <select
                name="min_tenancy_period"
                value={formData.min_tenancy_period}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Mininum Rent Period</option>
                <option value="1 month">1 month</option>
                <option value="6 month">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="5 years">5 years</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-xs">Furnishing:</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Furnishing Status</option>
                <option value="Not Furnished">Not Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-xs">
                Room/House Dimensions (e.g., 1200 sq ft):
              </label>
              <input
                type="text"
                name="dimension"
                placeholder="Dimensions"
                value={formData.dimension}
                onChange={handleInputChange}
                className="border border-gray-300 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <label className="block text-gray-700 font-semibold mt-4">
            Upload House Images (Min: 6, Max: 20)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {images.length < 6 && (
            <p className="text-red-500 text-sm mt-1">
              At least 6 images are required.
            </p>
          )}

          {/* Video Upload */}
          <label className="block text-gray-700 font-semibold mt-4">
            Upload Short Video (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="border border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Preview Uploaded Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          {/* Preview Uploaded Video */}
          {video && (
            <video controls className="w-full mt-4">
              <source src={URL.createObjectURL(video)} type={video.type} />
            </video>
          )}

          {/* Submit Button */}
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-md mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Listing
          </button>
        </form>
      )}
    </div>
  );
};

export default HouseUploadForm;
