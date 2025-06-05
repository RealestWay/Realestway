import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useChats } from "../../contexts/ChatsContext";

const ChatList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { chats } = useChats();

  if (!user) return <p>Please log in to view your chats.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Chats</h2>

      {chats.length === 0 ? (
        <p className="text-gray-500">No chats yet.</p>
      ) : (
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => navigate(`/ChatPage/${chat.id}`)}
            >
              <p className="text-blue-600 font-semibold">
                Chat with {chat?.agent_id}
              </p>
              <p className="text-gray-500 text-sm">House: {chat?.houseTitle}</p>
              <p className="text-gray-400 text-xs">
                Last message:{" "}
                {chat?.messages.filter((message) => console.log(message[0]))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
