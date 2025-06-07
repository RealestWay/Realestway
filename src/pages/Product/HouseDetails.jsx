import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useChats } from "../../contexts/ChatsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const HouseDetails = () => {
  const { user, isAuthenticated } = useAuth();
  const { house, loadingChats } = useOutletContext();
  const { fetchChat, setChat, chats, createChat } = useChats();

  const [selectedImage, setSelectedImage] = useState(null);
  const [desc, setDescription] = useState(true);

  useEffect(() => {
    if (!loadingChats && chats && house?.agentId) {
      const existingChat = chats?.find(
        (chat) => chat.agent_id === house.agentId
      );
      if (existingChat) setChat(existingChat);
    }
  }, [loadingChats, chats, house, setChat]);

  if (!house) {
    return (
      <p className="text-center text-gray-400">Loading house details...</p>
    );
  }

  const {
    priceType,
    bedrooms,
    bathrooms,
    dimension,
    description,
    propertyType,
    totalPrice,
    furnishing,
    createdAt,
    amenities,
    images,
    priceBreakdown,
    minTenancyPeriod,
    location,
    agentId,
  } = house;

  const existingChat = chats?.find((chat) => chat.agent_id === agentId);

  return (
    <div className="sm:flex w-full">
      <div className="sm:w-2/3">
        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="mb-4">
            <div className="flex justify-between">
              {" "}
              <h3 className="text-2xl font-bold text-blue-700">
                #{Number(totalPrice).toLocaleString()}
                <i className="text-sm ml-1">Total Package</i>
              </h3>
              <div className="w-[28%] flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="bg-[#00a256] w-max-[100px] hover:bg-[#7ff3bd] text-xs text-white p-1 py-1 sm:px-4  sm:py-2 rounded-lg"
                >
                  <FontAwesomeIcon icon={faLink} size="12" /> Copy Link
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <i className="text-gray-400 text-sm">
                Renew with: #{priceBreakdown?.basicRent?.toLocaleString()} /{" "}
                {priceType}
              </i>
            </div>
            <p className="text-gray-500">{location?.address}</p>
          </div>

          <p className="text-gray-700 mb-4">{description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4">
            <Info label="Property Type" value={propertyType} />
            <Info label="Bedrooms" value={bedrooms} />
            <Info label="Bathrooms" value={bathrooms} />
            <Info label="Dimension" value={`${dimension} sqFt`} />
            <Info label="Minimum Tenancy Period" value={minTenancyPeriod} />
            <Info label="Furnished" value={furnishing} />
          </div>

          <p className="text-sm text-gray-400 mt-4">Added on {createdAt}</p>
        </div>

        <div className="w-[95%] max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6 mt-6">
          <div className="border-t pt-4">
            <h4 className="text-lg font-semibold mb-4">Agent Rating</h4>
            <div className="flex justify-between items-center">
              <div>Very Good</div>
              {isAuthenticated ? (
                <>
                  {!user?.nin && (
                    <Link to={`/Chat`}>
                      <button
                        className="bg-[#00a256] text-white font-bold rounded px-4 py-2"
                        onClick={() => {
                          existingChat
                            ? fetchChat(existingChat.id)
                            : createChat(agentId);
                        }}
                      >
                        Contact Agent
                      </button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to={`/login`}>
                  <button className="bg-[#100073] text-white font-bold rounded px-4 py-2">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] sm:w-1/3 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <button
          className="bg-[#100073] w-full text-xl font-semibold text-white py-2 rounded"
          onClick={() => setDescription(!desc)}
        >
          {desc ? "More Details" : "View More Details"}
        </button>

        {desc && (
          <div className="p-6">
            <h3 className="font-semibold text-lg">Price Breakdown</h3>
            <ul className="flex flex-col mb-5 text-gray-600 text-sm">
              {priceBreakdown?.basicRent && (
                <li>
                  Basic Rent: #{priceBreakdown.basicRent.toLocaleString()}
                </li>
              )}
              {priceBreakdown?.agreementFee && (
                <li>
                  Agreement Fee: #{priceBreakdown.agreementFee.toLocaleString()}
                </li>
              )}
              {priceBreakdown?.cautionFee && (
                <li>
                  Caution Fee: #{priceBreakdown.cautionFee.toLocaleString()}
                </li>
              )}
              {priceBreakdown?.agentFee && (
                <li>Agent Fee: #{priceBreakdown.agentFee.toLocaleString()}</li>
              )}
            </ul>

            <h3 className="font-semibold text-lg">Key Features</h3>
            <ul className="text-gray-600 text-sm mb-5">
              {amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="font-semibold text-lg">Description</p>
            <p className="mb-4">{description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`https://backend.realestway.com/storage/${img.src}`}
                  alt={`House ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg cursor-pointer"
                  onClick={() =>
                    setSelectedImage(
                      `https://backend.realestway.com/storage/${img.src}`
                    )
                  }
                />
              ))}
            </div>

            {selectedImage && (
              <div className="fixed inset-0 bg-black z-[999] bg-opacity-75 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full max-h-[90vh] rounded-lg"
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
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default HouseDetails;
