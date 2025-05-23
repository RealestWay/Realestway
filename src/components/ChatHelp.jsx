import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ChatHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Lisa, how can I assist you with renting an apartment?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simulated bot response (replace with API call later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thanks for your message! We’ll get back to you soon.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {/* Chat Button */}
      {!isOpen && (
        <button
          className="bg-[#100073] text-white p-4 rounded-full shadow-lg hover:bg-[#4331bdd8] transition"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faCommentDots} size="xl" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#100073] text-white p-3 flex justify-between items-center">
            <div className="flex justify-between gap-3">
              <img
                src="/cs-realestway.png"
                width={50}
                height={50}
                style={{ borderRadius: "100px" }}
              />
              <div>
                <span className="font-semibold block">Chat Support</span>
                <span className="text-xs">support@realestway.com</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-60 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-[#100073] text-white self-end"
                    : "bg-[#00A256] text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-[#100073] text-white px-4 rounded-r-lg"
              onClick={handleSendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHelp;
