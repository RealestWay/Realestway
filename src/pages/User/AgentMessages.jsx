// components/AgentMessages.jsx
import { useState, useRef } from "react";
import {
  faPaperclip,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialChats = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey, I’m interested in the apartment.",
        time: "10:25",
        date: "2 June",
      },
      {
        id: 2,
        sender: "me",
        text: "Great! Let me share more details with you.",
        time: "11:25",
        status: "Sent",
        date: "2 June",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Can I come for an inspection tomorrow?",
        time: "14:10",
        date: "Today",
      },
    ],
  },
];

const AgentMessages = () => {
  const [chats, setChats] = useState(initialChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [newMsg, setNewMsg] = useState("");
  const [attachment, setAttachment] = useState(null);
  const inputRef = useRef();

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSend = () => {
    if (!newMsg && !attachment) return;
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: newMsg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Sent",
      date: "Today",
      attachment,
    };
    const updatedChats = chats.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );
    setChats(updatedChats);
    setNewMsg("");
    setAttachment(null);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((m) =>
        m.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Messages</h2>
          <button className="text-sm text-[#00a256]">View All</button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-sm"
        />
        <ul className="space-y-4">
          {filteredChats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <li
                key={chat.id}
                className={`flex items-start gap-3 cursor-pointer ${
                  activeChatId === chat.id ? "bg-gray-100 p-2 rounded" : ""
                }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <img
                  src={chat.avatar || ""}
                  alt="avatar"
                  className="w-10 h-10 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{chat.name}</h4>
                  <p className="text-xs text-gray-500 truncate">
                    {lastMsg.sender === "me" ? "You: " : ""}
                    {lastMsg.text || "Attachment"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{lastMsg.time}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img
              src={activeChat.avatar || ""}
              alt="avatar"
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div>
              <h4 className="font-medium text-sm">{activeChat.name}</h4>
              <p className="text-xs text-gray-500">{activeChat.email}</p>
            </div>
          </div>
          <button className="flex items-center text-[#00a256] text-sm">
            <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Array.from(new Set(activeChat.messages.map((m) => m.date))).map(
            (date) => (
              <div key={date}>
                <div className="text-center text-xs text-gray-500 mb-4">
                  {date}
                </div>
                {activeChat.messages
                  .filter((m) => m.date === date)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      <div
                        className={`max-w-md p-3 text-sm rounded-lg shadow relative ${
                          msg.sender === "me"
                            ? "bg-[#00a256] text-white"
                            : "bg-white text-gray-800 border"
                        }`}
                      >
                        {msg.attachment &&
                        msg.attachment.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(msg.attachment)}
                            alt="attachment"
                            className="rounded mb-2 max-w-xs"
                          />
                        ) : null}
                        {msg.text && <p>{msg.text}</p>}
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
                  ))}
              </div>
            )
          )}
        </div>

        {/* Chat Input */}
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
            <FontAwesomeIcon icon={faPaperclip} /> Attach
          </button>
          <button
            onClick={handleSend}
            className="bg-[#00a256] text-white px-6 py-2 rounded-full text-sm flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentMessages;
