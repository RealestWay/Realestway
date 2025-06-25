import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { CloseCircle } from "iconsax-reactjs";
import { useChats } from "../contexts/ChatsContext";
import { useAuth } from "../contexts/AuthContext";

const ChatBox = ({ setChatBox, house }) => {
  const { chat, fetchChat, fetchChats, setChat } = useChats();
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chat?.data?.id) return;

    const loadMessages = async () => {
      if (!initialFetchDone) setIsLoading(true);
      await fetchChat(chat.data.id);
      if (!initialFetchDone) {
        setIsLoading(false);
        setInitialFetchDone(true);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [chat?.data?.id, initialFetchDone]);

  useEffect(() => {
    if (Array.isArray(chat?.data?.messages)) {
      setMessages(chat.data.messages);
    }
  }, [chat?.data?.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const tempMessage = {
      id: Date.now(),
      sender: { id: user?.id },
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
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
          body: JSON.stringify({
            message: tempMessage.message,
            referenced_house_id: house?.id || "",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");
      await fetchChat(chat?.data?.id);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[999] w-full md:w-3/5 h-[80vh] md:h-[90vh] bg-white rounded-t-xl shadow-lg border border-gray-200 flex flex-col">
      <div className="bg-white p-4 rounded-t-xl flex justify-between items-center shadow-sm border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold">
            Chat with {chat?.data?.support?.name || "Agent"}
          </h2>
          <p className="text-sm text-gray-500 flex flex-col md:flex-row md:gap-3">
            {chat?.data?.support?.phone && (
              <span>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-1 text-green-600"
                />
                {chat?.data?.support?.phone}
              </span>
            )}
            {chat?.data?.support?.email && (
              <span>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-1 text-green-600"
                />
                {chat?.data?.support?.email}
              </span>
            )}
          </p>
        </div>
        <CloseCircle
          className="text-xl text-gray-400 hover:text-gray-700 cursor-pointer"
          size={24}
          onClick={() => {
            setChatBox(false);
            setChat(null);
            fetchChats();
          }}
        />
      </div>

      <div className="bg-yellow-100 w-full text-yellow-700 text-sm px-4 py-2 border-t border-b border-yellow-300 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-yellow-500"
        />
        <span>
          <strong>CAUTION:</strong> Realestway will not be held responsible for
          transactions made outside this platform.
        </span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg?.id} className="space-y-1">
              <div
                className={`text-sm p-3 rounded-lg w-fit max-w-[80%] ${
                  msg?.sender?.id === user?.id
                    ? "bg-[#100073] ml-auto rounded-br-none text-white"
                    : "bg-[#00a256] rounded-bl-none text-white"
                }`}
              >
                {msg?.message}
              </div>
              <div
                className={`text-[10px] ${
                  msg?.sender?.id === user?.id ? "text-right" : "text-left"
                } opacity-70 px-2`}
              >
                {new Date(msg?.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          className="text-white bg-[#00A256] px-4 py-2 rounded-full text-sm hover:bg-[#008a4a] transition"
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
