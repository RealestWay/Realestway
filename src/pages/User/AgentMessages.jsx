// components/AgentMessages.jsx
import { useState, useEffect, useRef } from "react";
import { faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChats } from "../../contexts/ChatsContext";
import { useAuth } from "../../contexts/AuthContext";
import { CloseCircle } from "iconsax-reactjs";

const AgentMessages = () => {
  const { chats, chat, fetchChat } = useChats();
  const { token, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Load chat messages periodically
  useEffect(() => {
    if (!activeChatId) return;
    const loadMessages = async () => {
      try {
        await fetchChat(activeChatId);
      } catch (err) {
        console.error("Failed to fetch chat:", err);
      }
    };
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [activeChatId]);

  useEffect(() => {
    if (Array.isArray(chat?.data?.messages)) {
      setMessages(chat.data.messages);
    }
  }, [chat?.data?.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    const tempMessage = {
      id: Date.now(),
      sender: { id: user.id },
      message: newMsg,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMsg("");

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/chats/${chat?.data?.id}/messages`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: tempMessage.message }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      await fetchChat(chat?.data?.id);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  };
  const validChats = chats.filter(
    (chat) => chat.messages.length > 0 && chat.chatType === "house_inquiry"
  );

  const filteredChats = validChats.filter((chat) =>
    chat?.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="md:flex h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-white border-r p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Messages</h2>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-sm"
        />
        <ul className="space-y-4">
          {filteredChats.length === 0 ? (
            <p className="text-gray-500">No chats found.</p>
          ) : (
            filteredChats.map((chat) => (
              <li
                key={chat.id}
                className={`flex items-start gap-3 cursor-pointer ${
                  activeChatId === chat.id ? "bg-gray-100 p-2 rounded" : ""
                }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <img
                  src={"/cs-realestway.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{chat.user.fullName}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.messages?.[chat.messages.length - 1]?.message ||
                      "No message"}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Chat Window */}
      {activeChatId && (
        <div className="hidden md:flex md:flex-col flex-1">
          <div className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={"/cs-realestway.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h4 className="font-medium text-sm">
                  {activeChat?.user?.fullName}
                </h4>
                <p className="text-xs text-gray-500">
                  {activeChat?.user?.email}
                </p>
              </div>
            </div>
            <button className="flex items-center text-[#00a256] text-sm">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 scrollbar-hide scrollbar-hidden">
            {messages.map((msg) => (
              <div
                key={msg?.id}
                className={`flex flex-col ${
                  msg?.sender?.id === user?.id
                    ? "justify-end place-items-end"
                    : "justify-start place-items-start"
                }`}
              >
                <div
                  className={`max-w-md p-3 flex flex-col gap-3 text-sm rounded-lg shadow relative ${
                    msg?.sender?.id === user?.id
                      ? "bg-[#00a256] text-white"
                      : "bg-white text-[#100073] border"
                  }`}
                >
                  {msg?.referencedHouse?.title ? (
                    <span className="rounded-lg relative">
                      <img
                        className="rounded-lg"
                        src={`https://backend.realestway.com/storage/${msg?.referencedHouse?.medias[0].path}`}
                        height={50}
                      />
                      <i className="text-xs p-2 bg-black rounded-sm bg-opacity-60 text-white absolute right-0 top-0">
                        {msg?.referencedHouse?.title}{" "}
                      </i>
                    </span>
                  ) : (
                    ""
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
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-t p-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 p-3 border rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#00a256] text-white px-6 py-2 rounded-full text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </button>
          </div>
        </div>
      )}
      {/* //Chat window for mobile  */}
      {activeChatId && (
        <div className="md:hidden flex flex-col flex-1 absolute z-[9999] max-w-[99vw] h-[95vh] bottom-1 overflow-y-auto scrollbar-hide scrollbar-hidden">
          <div className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={"/cs-realestway.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h4 className="font-medium text-sm">
                  {activeChat?.user?.fullName}
                </h4>
                <p className="text-xs text-gray-500">
                  {activeChat?.user?.email}
                </p>
              </div>
            </div>
            <button className="flex items-center text-[#00a256] text-sm">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call
            </button>
            <button
              onClick={() => setActiveChatId(null)}
              className="flex items-center text-[#00a256] text-sm"
            >
              <CloseCircle size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg?.id}
                className={`flex flex-col  ${
                  msg?.sender?.id === user?.id
                    ? "justify-end place-items-end"
                    : "justify-start place-items-start"
                }`}
              >
                <div
                  className={`max-w-md flex flex-col gap-3 w-3/5 p-3 text-sm rounded-lg shadow relative ${
                    msg?.sender?.id === user?.id
                      ? "bg-[#00a256] text-white"
                      : "bg-white text-[#100073] border"
                  }`}
                >
                  {msg?.referencedHouse?.title ? (
                    <span className="rounded-lg relative">
                      <img
                        className="rounded-lg"
                        src={`https://backend.realestway.com/storage/${msg?.referencedHouse?.medias[0].path}`}
                        height={50}
                      />
                      <i className="text-xs p-2 bg-black rounded-sm bg-opacity-60 text-white absolute right-0 top-0">
                        {msg?.referencedHouse?.title}{" "}
                      </i>
                    </span>
                  ) : (
                    ""
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
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-t p-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 p-3 border rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#00a256] text-white px-6 py-2 rounded-full text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentMessages;
