import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useChats } from "../contexts/ChatsContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ChatHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createChat, chats, fetchChat, chat, fetchChats } = useChats();
  const { token, user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();
  const existingChat = chats?.find(
    (chat) => chat?.support?.id === "01jyk0va2xmg773v3322qnz79d"
  );

  useEffect(() => {
    if (!chat?.data?.id) return;

    const chatId = chat?.data?.id;
    if (Array.isArray(chat?.data?.messages)) {
      setMessages(chat?.data?.messages);
    }

    const interval = setInterval(() => {
      fetchChat(chatId);
    }, 5000);

    return () => clearInterval(interval);
  }, [chat?.data?.id]);

  const handleChat = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: { id: user.id },
      id: messages?.length + 1,
      message: newMessage,
    };

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
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end animate-fade-in">
      {!isOpen && (
        <button
          className="bg-[#100073] text-white p-4 rounded-full shadow-lg hover:bg-[#4331bdd8] transition"
          onClick={async () => {
            if (!isAuthenticated) return navigate("/login");

            if (existingChat?.id) {
              await fetchChat(existingChat?.id);
              setIsOpen(true);
            } else {
              await createChat(
                "01jyk0va2xmg773v3322qnz79d",
                null,
                "general_support"
              );
              setIsOpen(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faCommentDots} size="xl" />
        </button>
      )}

      {isOpen && chat?.data && (
        <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-[#100073] text-white p-3 flex justify-between items-center">
            <div className="flex gap-3">
              <img
                src="/cs-realestway.png"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <span className="font-semibold block">Chat Support</span>
                <span className="text-xs">support@realestway.com</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                fetchChats();
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="p-3 h-60 overflow-y-auto space-y-3 flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender_id === user.id
                    ? "bg-[#100073] text-white self-end"
                    : "bg-[#00A256] text-white self-start"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
            />
            <button
              className="bg-[#100073] text-white px-4 rounded-r-lg"
              onClick={handleChat}
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
