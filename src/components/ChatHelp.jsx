import { useEffect, useRef, useState } from "react";
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
  const { createChat, chats, fetchChat, chat, fetchChats, setChat } =
    useChats();
  const { token, user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);
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
  }, [chat?.data?.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleChat = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: { id: user.id },
      id: messages?.length + 1,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/chats/${chat.data.id}/messages`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDateHeader = (dateStr) => {
    const today = new Date();
    const msgDate = new Date(dateStr);
    const isToday = today.toDateString() === msgDate.toDateString();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = yesterday.toDateString() === msgDate.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return msgDate.toLocaleDateString();
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end animate-fade-in z-[50]">
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
          {/* Header */}
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
                setChat(null);
                fetchChats();
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Chat body */}
          <div className="p-3 h-60 overflow-y-auto space-y-3 flex flex-col">
            {(() => {
              const grouped = {};
              messages.forEach((msg) => {
                const dateKey = new Date(msg.createdAt).toDateString();
                if (!grouped[dateKey]) grouped[dateKey] = [];
                grouped[dateKey].push(msg);
              });

              return Object.entries(grouped).map(([dateKey, msgs]) => (
                <div key={dateKey} className="space-y-4">
                  <div className="text-center text-xs text-gray-500 font-medium my-2">
                    {formatDateHeader(msgs[0].createdAt)}
                  </div>
                  {msgs.map((msg) => (
                    <div
                      key={msg?.id}
                      className={`flex flex-col ${
                        msg?.sender?.id === user?.id
                          ? "justify-end place-items-end"
                          : "justify-start place-items-start"
                      }`}
                    >
                      <div
                        className={`max-w-md flex flex-col gap-3 p-3 text-sm rounded-lg shadow relative ${
                          msg?.sender?.id === user?.id
                            ? "bg-[#00a256] text-white"
                            : "bg-white text-[#100073] border"
                        }`}
                      >
                        {msg?.referencedHouse?.title && (
                          <span className="rounded-lg relative">
                            <img
                              className="rounded-lg"
                              src={`https://backend.realestway.com/storage/${msg?.referencedHouse?.medias[0].path}`}
                              height={50}
                            />
                            <i className="text-xs p-2 bg-black rounded-sm bg-opacity-60 text-white absolute right-0 top-0">
                              {msg?.referencedHouse?.title}
                            </i>
                          </span>
                        )}
                        <p>{msg?.message}</p>
                      </div>
                      <div className="text-[10px] text-right mt-1 text-gray-400">
                        {new Date(msg?.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
              className="bg-[#00a256] text-white px-4 rounded-r-lg"
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
