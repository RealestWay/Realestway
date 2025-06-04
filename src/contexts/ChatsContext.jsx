import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();
const BASE = "https://backend.realestway.com/api";
const ChatProvider = ({ children }) => {
  const [chats, setchats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState("");
  const [chat, setChat] = useState([]);
  const { token } = useAuth();

  // fetch all chats

  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE}/chats`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const data = await res.json();
      setchats(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a Chat

  const fetchChat = async (agentId) => {
    setIsLoading(true);
    try {
      const response = await fetch("https:/backend.realestway.com/api/chats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          agent_unique_id: agentId,
        }),
      });

      const data = await response.json();
      setChat(data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch an Agent
  const fetchAgent = async (id) => {
    try {
      const res = await fetch(
        `https://backend.realestway.com/api/agents/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setAgent(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ChatContext.Provider
      value={{
        chats,
        isLoading,
        fetchChats,
        fetchChat,
        chat,
        fetchAgent,
        agent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChats = () => {
  const chats = useContext(ChatContext);
  if (chats === undefined)
    throw new Error("chats context was used outside its provider");
  return chats;
};

export { ChatProvider, useChats };
