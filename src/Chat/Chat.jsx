import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UseHouses } from "../contexts/HouseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faEnvelope,
  faPhone,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
import { useChats } from "../contexts/ChatsContext";

const Chat = () => {
  const { user, token } = useAuth();
  const { chat, loadingChat, fetchChat, setChat } = useChats();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (chat?.data?.messages && Array.isArray(chat.data.messages)) {
      setMessages(chat.data.messages);
    }
    const interval = setInterval(fetchChat(chat?.data?.id), 5000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, [chat]);

  const handleChat = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender_id: user.id,
      id: messages?.length + 1,
      message: newMessage,
    };

    // Optimistically update UI
    setMessages([...messages, newMsg]);
    setNewMessage("");

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/chats/${chat.data.id}/messages`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            message: newMessage,
          }),
        }
      );

      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loadingChat || !chat?.data) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Back Button */}
      <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-[#100073]">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#100073]  hover:bg-blue-700 transition-all"
          onClick={() => {
            navigate(-1);
            setChat([]);
          }}
        >
          <span className="flex justify-between sm:justify-around w-[18 %] sm:w-[5%]">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
          </span>
        </button>
        <div className="sm:w-4/5 flex sm:pl-[20%] w-[70%]">
          <h2 className="text-lg font-bold">
            {user.companyName ? user.fullName : chat?.id}
          </h2>
        </div>
      </div>

      <div className="sm:flex sm:mx-auto w-full max-w-6xl p-4">
        {/* Left Panel - Important Info */}
        <div className="m-4 sm:w-[20%] bg-[#100073] text-white px-4 py-6 rounded-lg shadow-md">
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
                  {user.phone}
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
            {/* Chat Messages */}
            {messages?.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`my-2 p-3 max-w-xs text-sm shadow-md ${
                    msg.sender_id === user.id
                      ? "bg-[#00A256] text-white ml-auto rounded-bl-xl rounded-tl-xl rounded-tr-xl"
                      : "bg-[#100073] text-white rounded-br-xl rounded-tr-xl rounded-tl-xl"
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
              className="ml-2 px-5 py-2 bg-[#100073] text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
