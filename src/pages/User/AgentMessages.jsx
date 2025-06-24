// components/AgentMessages.jsx
import { useState, useRef, useEffect } from "react";
import {
  faPaperclip,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChats } from "../../contexts/ChatsContext";
import { useAuth } from "../../contexts/AuthContext";

const AgentMessages = () => {
  const { chats, chat, fetchChat } = useChats();
  const { token, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [attachment, setAttachment] = useState(null);
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const activeChat = chats?.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    if (!activeChatId) return;
    const fetchMessages = async () => {
      setLoadingChat(true);
      await fetchChat(activeChatId);
      setLoadingChat(false);
    };
    fetchMessages();
    const interval = setInterval(() => fetchChat(activeChatId), 5000);
    return () => clearInterval(interval);
  }, [activeChatId]);

  useEffect(() => {
    if (Array.isArray(chat?.data?.messages)) {
      setMessages(chat.data.messages);
    }
  }, [chat]);

  const handleSend = async () => {
    if (!newMsg.trim() && !attachment) return;
    const messagePayload = {
      sender_id: user.id,
      id: messages?.length + 1,
      message: newMsg,
    };
    setMessages([...messages, messagePayload]);
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
          body: JSON.stringify({ message: newMsg }),
        }
      );
      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat?.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages?.some((m) =>
        m.text?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex h-screen">
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
            filteredChats.map((chat) => {
              const lastMsg = chat.messages?.[chat.messages.length - 1] || {};
              return (
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
                    <h4 className="font-medium text-sm">
                      {chat?.user.fullName}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {lastMsg.sender === "me" ? "You: " : ""}
                      {lastMsg.text || "Attachment"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{lastMsg.time}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Chat Window */}
      {activeChatId && (
        <div className="hidden md:flex md:flex-col flex-1">
          {/* Header */}
          <div className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={"/cs-realestway.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div>
                <h4 className="font-medium text-sm">{activeChat?.name}</h4>
                <p className="text-xs text-gray-500">{activeChat?.email}</p>
              </div>
            </div>
            <button className="flex items-center text-[#00a256] text-sm">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {loadingChat ? (
              <p className="text-center text-sm text-gray-500">
                Loading chat...
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-md p-3 text-sm rounded-lg shadow relative ${
                      msg.sender === "me"
                        ? "bg-[#00a256] text-white"
                        : "bg-white text-gray-800 border"
                    }`}
                  >
                    {msg.attachment?.type?.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(msg.attachment)}
                        alt="attachment"
                        className="rounded mb-2 max-w-xs"
                      />
                    )}
                    <p>{msg.text}</p>
                    <div className="text-[10px] text-right mt-1">
                      <span className="block text-gray-200">
                        {msg.time}{" "}
                        {msg.sender === "me" && msg.status
                          ? "✓✓ " + msg.status
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t p-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 p-3 border rounded-full text-sm focus:outline-none"
            />
            <input
              type="file"
              ref={inputRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) setAttachment(e.target.files[0]);
              }}
            />
            <button
              className="p-2 text-[#00a256]"
              onClick={() => inputRef.current.click()}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
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
