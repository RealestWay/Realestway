import { useState } from "react";
import { getCurrentLocation } from "../../service/getLocation";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";
import Spinner2 from "../../components/Spinner2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HouseUploadForm = ({ onClose }) => {
  const { fetchHouses, fetchAgentHouses } = UseHouses();
  const { token, user } = useAuth();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const [formData, setFormData] = useState({
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
    caretaker_acc_number: "",
    caretaker_bank_name: "",
    caretaker_acc_name: "",
    pricing_type: "",
    min_tenancy_period: "",
    amenities: [],
    availability: "available",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    address: "",
    city: "",
    state: "",
    zipCode: null,
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
    agreementFee: "",
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
    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length) {
      alert(`Invalid file type: ${invalidFiles.map((f) => f.name).join(", ")}`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter((file) => file.size > maxSize);
    if (oversizedFiles.length) {
      alert(`Files too large: ${oversizedFiles.map((f) => f.name).join(", ")}`);
      return;
    }

    if (files.length + images.length > 20) {
      alert("Maximum of 20 images allowed!");
      return;
    }

    setImages([...images, ...files]);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) {
      alert("Video file must be less than 50MB");
      return;
    }

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };
  const handleVideoRemoval = () => {
    setVideo(null);
    setVideoPreview("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate minimum images
    if (images.length < 6 && !video) {
      setError("Minimum 6 images or a video upload required");
      return;
    }

    if (!locationData.latitude || !locationData.longitude) {
      setError("Please record the house location");
      return;
    }

    try {
      const data = new FormData();
      setIsSubmitting(true);

      // Append all form fields
      Object.entries({
        ...formData,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        location_address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        zipcode: locationData.zipCode,
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

      // Append images with correct field name
      images.forEach((image) => {
        data.append("images[]", image); // Most APIs expect this format
      });

      // Append video if exists
      if (video) {
        data.append("video", video);
      }

      // Debug: Log FormData contents
      // for (let [key, value] of data.entries()) {
      //   console.log(key, value);
      // }

      const res = await fetch("https://backend.realestway.com/api/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Failed to submit property");
      }

      const result = await res.json();
      setSuccessMessage("Property submitted successfully!");

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
        amenities: [],
        caretaker_acc_number: "",
        caretaker_bank_name: "",
        caretaker_acc_name: "",
      });
      setImages([]);
      setVideo(null);
      setLocationData({
        latitude: null,
        longitude: null,
        address: "",
        city: "",
        state: "",
        zipCode: null,
        error: "",
      });
      setPriceBreakdown({
        basicRent: "",
        cautionFee: "",
        agentFee: "",
        agreementFee: "",
      });

      // Refresh house data
      await fetchHouses();
      await fetchAgentHouses();
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Upload Property</h2>
          <button
            onClick={onClose}
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

          <div className="mb-6">
            <button
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={fetchLocation}
              disabled={!!locationData.latitude}
            >
              {locationData.latitude ? "Location Recorded" : "Record Location"}
            </button>
            {locationData.latitude ? (
              <p className="text-sm text-green-600 mt-2">
                Location recorded successfully!
              </p>
            ) : (
              <p className="text-sm text-red-600 mt-2">
                Please record location before proceeding
              </p>
            )}
          </div>

          {locationData.latitude && (
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
                <h3 className="text-lg font-semibold mb-4">
                  Price Details (₦)
                </h3>
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

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Upload Property Images (Min: 6, Max: 20)
                </h3>
                <div className="border-2 border-dashed border-[#00a256] rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-12 h-12 text-[#00a256] mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-gray-600">
                        Drag your images or browse
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Max: 10 MB per file
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports: PNG, JPG, SVG
                      </p>
                    </div>
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="h-20 w-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            <FontAwesomeIcon icon={faTimes} size="xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {images.length} images selected (Min: 6)
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Upload Short Video (Optional)
                </h3>
                <div className="border-2 border-dashed border-[#00a256] rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer block"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-12 h-12 text-[#00a256] mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-gray-600">Drag your video or browse</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Max: 50 MB files are allowed
                      </p>
                      <p className="text-sm text-gray-500">Supports: .mp4</p>
                    </div>
                  </label>
                </div>
                {video && (
                  <div className="mt-4 relative">
                    <p className="text-sm text-gray-500">
                      Video selected: {video.name}
                    </p>
                    <button
                      type="button"
                      onClick={handleVideoRemoval}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                    <video
                      width="100%"
                      height="auto"
                      controls
                      className="rounded-lg shadow-md relative mt-2"
                    >
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Additional Features
                </h3>
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
                    "Submit Property"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseUploadForm;
