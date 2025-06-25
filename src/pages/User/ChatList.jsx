import { useAuth } from "../../contexts/AuthContext";
import { useChats } from "../../contexts/ChatsContext";
import { useState } from "react";

const ChatList = ({ chatbox, setChatBox }) => {
  const { user } = useAuth();

  const { chats, fetchChat } = useChats();
  const [clickedChatId, setClickedChatId] = useState(null);

  if (!user) return <p>Please log in to view your chats.</p>;

  const validChats = chats.filter(
    (chat) => chat.messages.length > 0 && chat.chatType === "house_inquiry"
  );

  const handleChatClick = async (chatId) => {
    setClickedChatId(chatId);
    await fetchChat(chatId);

    setClickedChatId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-lg max-h-[410px] overflow-scroll scrollbar-hide scrollbar-hidden">
      {/* <h2 className="text-xl font-semibold mb-4 ">Your Chats</h2> */}

      {validChats?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200">No chats yet.</p>
      ) : (
        <ul className="space-y-4">
          {validChats?.map((chat) => {
            const isClicked = clickedChatId === chat.id;
            if (!chat.admin_id)
              return (
                <li
                  key={chat.id}
                  className={`relative p-3 border rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${isClicked ? "bg-blue-50 animate-pulse" : ""}
                `}
                  onClick={() => {
                    handleChatClick(chat.id);
                    setChatBox(!chatbox);
                  }}
                >
                  <p className="text-blue-600 font-semibold">
                    Chat with {chat?.support.fullName}
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
