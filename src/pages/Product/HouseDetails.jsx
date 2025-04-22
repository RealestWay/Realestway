import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const HouseDetails = () => {
  const { user } = useAuth();

  const { house } = useOutletContext();

  const {
    priceType,
    bedrooms,
    bathrooms,
    dimension,
    description,
    propertyType,
    totalPrice,
    address,
    furnishing,
    date_listed,
    amenities,
    images,
    priceBreakdown,
    minTenancyPeriod,
  } = house;

  const [selectedImage, setSelectedImage] = useState(null);
  const [desc, setDescription] = useState(false);
  if (!house)
    return (
      <p className="text-center text-gray-400">Loading house details...</p>
    );

  return (
    <div className="sm:flex w-full">
      <div className="sm:w-2/3">
        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Price & Location */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-blue-700">
              #{totalPrice.toLocaleString()}
              <span className="text-sm ml-1">{priceType}</span>
            </h3>
            <i className="text-gray-400 text-sm">
              Renew with: #{priceBreakdown.basicRent?.toLocaleString()}
            </i>
            <p className="text-gray-500">{address}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{description}</p>

          {/* Property Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <p className="text-sm text-gray-400">Property Type</p>
              <p className="font-semibold">{propertyType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Bedrooms</p>
              <p className="font-semibold">{bedrooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Bathrooms</p>
              <p className="font-semibold">{bathrooms}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Dimension</p>
              <p className="font-semibold">{dimension} sqFt</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Minimum Tenancy Period</p>
              <p className="font-semibold">{minTenancyPeriod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Furnished</p>
              <p className="font-semibold">{furnishing}</p>
            </div>
          </div>

          {/* Date Listed */}
          <p className="text-sm text-gray-400 mt-4">Added on {date_listed}</p>
        </div>

        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Agent Details */}
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold">Agent Rating</h4>

            <div className="flex justify-between">
              <div>Very Good</div>
              {!user.nin && (
                <Link to={`/ChatPage/${house.id}`}>
                  <button className="bg-blue-500 text-white font-bold rounded px-4 py-2">
                    Contact Agent
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-[95%] sm:w-1/3 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200"
        style={{ height: !desc ? "25px" : "" }}
      >
        <button
          className="bg-blue-400 w-full text-xl font-semibold text-white py-2 rounded"
          onClick={() => setDescription(!desc)}
        >
          View More Details
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
                    // src={`../src/images${img.src}`}
                    src={img.src}
                    alt={`House ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedImage(`../src/images${img.src}`)}
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
