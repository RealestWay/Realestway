import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UseHouses } from "../contexts/HouseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faEnvelope,
  faPhone,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

const ChatPage = () => {
  const { propertyId } = useParams();
  const { user, agents } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { houses } = UseHouses();
  const house = houses.find((h) => h.id === propertyId);
  const agent = agents.find((a) => a.id === house.agent_id);
  const { price_type, title, price, location, images } = house;
  const navigate = useNavigate();

  const handleChat = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        sender_id: user.id,
        id: messages.length + 1, // Unique ID for messages
        message: newMessage,
      },
    ]);
    setNewMessage(""); // Clear input field after sending
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Back Button */}
      <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-[#100073]">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#100073]  hover:bg-blue-700 transition-all"
          onClick={() => navigate(-1)}
        >
          <span className="flex justify-between sm:justify-around w-[18 %] sm:w-[5%]">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
            <span>Back</span>
          </span>
          <div className="sm:w-4/5 flex sm:pl-[20%]">
            <h2 className="text-lg font-bold">
              {user.company ? user.name : title}
            </h2>
          </div>
        </button>
      </div>

      <div className="sm:flex sm:mx-auto w-full max-w-6xl p-4">
        {/* Left Panel - Important Info */}
        <div className="m-4 sm:w-[20%] bg-blue-600 text-white px-4 py-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-center mb-3">
            Important Information
          </h3>
          <p className="text-sm text-center">
            Clarify all necessary details with the agent. Consider a live video
            call for virtual inspection.
          </p>
          <div className="mt-3 text-yellow-400 text-sm text-center">
            <FontAwesomeIcon icon={faWarning} className="mr-2" />
            <i>
              Caution: We are not responsible for transactions outside this
              platform.
            </i>
          </div>
        </div>

        {/* Chat Section */}
        <div className="sm:w-[60%] mx-auto p-4 bg-white shadow-lg rounded-lg">
          {/* Chat Header */}
          {/* Agent Contact Info */}
          {!user.company && (
            <div className="mb-3 p-3 bg-white rounded-md shadow text-green-600">
              <p className="text-center">
                Drop your inquiries below or reach agent via:
              </p>
              <div className="sm:flex sm:justify-between mt-2 text-sm">
                <p>
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {agent.phone}
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {agent.email}
                </p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
            {/* Chat Messages */}
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`my-2 p-3 max-w-xs text-sm shadow-md ${
                    msg.sender_id === user.id
                      ? "bg-blue-500 text-white ml-auto rounded-bl-xl rounded-tl-xl rounded-tr-xl"
                      : "bg-gray-200 text-black rounded-br-xl rounded-tr-xl rounded-tl-xl"
                  }`}
                >
                  {msg.message}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No messages yet. Start the conversation!
              </p>
            )}
          </div>

          {/* Message Input */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleChat}
              className="ml-2 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Panel - Property Details */}
        <div className="m-4 sm:w-[20%] bg-white shadow-md p-4 rounded-lg">
          <img
            src={`../src/images${images[0]}`}
            className="rounded-xl w-full h-40 object-cover"
            alt="Apartment"
          />
          <h3 className="text-2xl font-bold text-blue-700 mt-3">
            ${price}
            <span className="text-sm ml-1">{price_type}</span>
          </h3>
          <p className="text-gray-500">{location.address}</p>
          <div className="w-full flex justify-around my-5">
            <Link to={`/OrderPage/${propertyId}`}>
              {" "}
              <button className="bg-gradient-to-b from-green-500 to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
                Secure Apartment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
