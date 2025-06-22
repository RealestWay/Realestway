import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faTriangleExclamation,
  faDirections,
  faCalendar,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { CloseCircle } from "iconsax-reactjs";

const ChatBox = ({ setChatBox }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      text: "Hello, This is Agent Name. How may I help you today?",
      time: "8:00 PM",
    },
    {
      id: 2,
      sender: "user",
      text: "User can now talk to the agent",
      time: "8:00 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: newMessage,
        time: "Now",
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-full bg-white md:w-3/5 h-[80vh] md:h-[90vh] animate-fade-in bottom-0 right-0 fixed z-50 mx-auto rounded-xl shadow-lg border border-gray-200">
      <div className="bg-white p-4 rounded-t-xl flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-lg font-bold">Chat with agent name</h2>
          <p className="text-sm text-gray-500 md:flex gap-3">
            <span>
              <FontAwesomeIcon icon={faPhone} className="mr-1 text-green-600" />{" "}
              +2348120606547{" "}
            </span>
            <br />
            <span>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-1 text-green-600"
              />{" "}
              agent@email.com
            </span>
          </p>
        </div>
        <CloseCircle
          className="text-xl text-gray-400 hover:text-gray-700"
          size={24}
          onClick={() => setChatBox(false)}
        />
      </div>

      <div className="w-full bg-white">
        {" "}
        <div className="bg-yellow-100 md:w-5/6 w-full rounded-md mx-auto text-yellow-700 text-sm px-4 py-2 border-t border-b border-yellow-300 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-yellow-500"
          />
          <span>
            <strong>CAUTION:</strong> Realestway will not be held responsible
            for transactions made outside this platform.
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3 h-[45vh] overflow-hidden scrollbar-hide scrollbar-hidden overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <>
            <div
              key={msg.id}
              className={`text-sm p-2 text-white py-3 rounded-lg w-fit max-w-[80%] ${
                msg.sender === "agent"
                  ? "bg-[#00a256] rounded-bl-none"
                  : "bg-[#100073] ml-auto rounded-br-none"
              }`}
            >
              {msg.text}
            </div>
            <div
              className={`text-[10px] ${
                msg.sender === "agent" ? "text-left" : "text-right"
              } opacity-70 mt-1 px-2`}
            >
              {msg.time}
            </div>
          </>
        ))}
      </div>

      <div className="flex justify-around gap-2 text-xs py-2 px-4 bg-white border-t border-gray-200">
        <button className="border-[1px] border-[#8F90A6] bg-[#F4F4F4] p-1 px-2 rounded-2xl items-center flex gap-1">
          <FontAwesomeIcon icon={faPhone} color="#808080" />
          Call Agent
        </button>
        <button className="border-[1px] border-[#8F90A6] bg-[#F4F4F4] p-1 px-2 rounded-2xl items-center flex gap-1">
          <FontAwesomeIcon icon={faDirections} color="#808080" />
          Get Directions
        </button>
        <button className="border-[1px] border-[#8F90A6] bg-[#F4F4F4] p-1 px-2 rounded-2xl items-center flex gap-1">
          <FontAwesomeIcon icon={faCalendar} color="#808080" />
          Schedule Viewing
        </button>
        <button className="border-[1px] border-[#8F90A6] bg-[#F4F4F4] p-1 px-2 rounded-2xl items-center flex gap-1">
          <FontAwesomeIcon icon={faPhotoFilm} color="#808080" />
          Request More Photos
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-b-xl border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          className="text-white bg-[#00A256] px-4 py-2 rounded-full text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
