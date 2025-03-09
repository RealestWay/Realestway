import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";

const HouseDetails = () => {
  const { houses } = UseHouses();
  const { agents, fetchAgents } = useAuth();
  const { id } = useParams();
  const house = houses.find((h) => h.id === id);
  const agent = agents.find((a) => a.id === house.agent_id);

  const {
    price_type,
    details,
    description,
    title,
    price,
    location,
    date_listed,
    amenities,
    images,
  } = house;

  const [selectedImage, setSelectedImage] = useState(null);
  const [desc, setDescription] = useState(false);
  useEffect(() => {
    if (!agents) fetchAgents();
  }, [agents]);

  return (
    <div className="sm:flex w-full">
      <div className="sm:w-2/3">
        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Price & Location */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-700">
              ${price}
              <span className="text-sm ml-1">{price_type}</span>
            </h3>
            <p className="text-gray-500">{location.address}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{description}</p>

          {/* Property Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="text-sm text-gray-400">Property Type</p>
              <p className="font-semibold">{title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Bedrooms</p>
              <p className="font-semibold">{details.bedrooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Bathrooms</p>
              <p className="font-semibold">{details.bathrooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Dimension</p>
              <p className="font-semibold">{details.square_feet} sqFt</p>
            </div>
          </div>

          {/* Date Listed */}
          <p className="text-sm text-gray-400 mt-4">Added on {date_listed}</p>
        </div>
        {/* other info */}
        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="sm:grid sm:grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-sm text-gray-400">Minimum Tenancy Period</p>
              <p className="font-semibold">1 year</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Furnished</p>
              <p className="font-semibold">{details.furnishing}</p>
            </div>
          </div>
          {/* Agent Details */}
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold">Agent Information</h4>
            <p className="text-gray-700">{agent.name}</p>
            <p className="text-blue-600">{agent.phone}</p>
            <p className="text-gray-500">{agent.email}</p>
            <p className="text-gray-500">{agent.company}</p>
          </div>
        </div>
      </div>
      <div
        className="w-[95%] sm:w-1/3 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200"
        style={{ height: !desc ? "25px" : "" }}
      >
        <button
          className="bg-blue-400 w-full text-xl font-semibold text-white"
          onClick={() => setDescription(!desc)}
        >
          View Full Description
        </button>
        {desc ? (
          <div className="p-6">
            <h3 className="font-semibold text-lg">Key Features</h3>
            <ul className="text-gray-600 text-sm mb-5">
              {amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="font-semibold text-lg">Description</p>
            <p>{description}</p>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`../src/images${img}`}
                    alt={`House ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(`../src/images${img}`)}
                  />
                ))}
              </div>

              {/* Modal */}
              {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-w-full max-h-[80vh] rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HouseDetails;
