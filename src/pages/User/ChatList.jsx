import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useChats } from "../../contexts/ChatsContext";
import { useState } from "react";

const ChatList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { chats, fetchChat } = useChats();
  const [clickedChatId, setClickedChatId] = useState(null);

  if (!user) return <p>Please log in to view your chats.</p>;

  const handleChatClick = async (chatId) => {
    setClickedChatId(chatId);
    const result = await fetchChat(chatId);
    if (result) navigate("/message");
    setClickedChatId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Chats</h2>

      {chats?.length === 0 ? (
        <p className="text-gray-500">No chats yet.</p>
      ) : (
        <ul className="space-y-4">
          {chats?.map((chat) => {
            const isClicked = clickedChatId === chat.id;

            return (
              <li
                key={chat.id}
                className={`relative p-3 border rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${isClicked ? "bg-blue-50 animate-pulse" : ""}
                `}
                onClick={() => handleChatClick(chat.id)}
              >
                <p className="text-blue-600 font-semibold">
                  Chat with {user.companyName ? chat?.user_id : chat?.agent_id}
                </p>
                <p className="text-gray-500 text-sm">
                  House: {chat?.houseTitle}
                </p>
                <p className="text-gray-400 text-xs">
                  Last message:{" "}
                  {chat?.messages?.at(-1)?.message || "No message"}
                </p>

                {/* Loading indicator */}
                {isClicked && (
                  <span className="absolute top-2 right-3 text-sm text-blue-500">
                    Opening...
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
