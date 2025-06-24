import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();
const BASE = "https://backend.realestway.com/api";
const ChatProvider = ({ children }) => {
  const [chats, setchats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
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
      if (res.status === 401 && token) {
        alert("Session expired! You were logged in on another device.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return;
      }

      const data = await res.json();
      setchats(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a Chat

  const createChat = async (support_id, house_listing_id, house_inquiry) => {
    setLoadingChat(true);
    try {
      const response = await fetch("https://backend.realestway.com/api/chats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          support_id: support_id, // The person that listed the house
          house_listing_id: house_listing_id, // nullable
          chat_type: house_inquiry, //house_inquiry or general_support
        }),
      });

      const data = await response.json();
      setChat(data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setLoadingChat(false);
    }
  };

  // Create Chat Support
  const createAdminChat = async (adminId) => {
    setLoadingChat(true);
    try {
      const response = await fetch("https://backend.realestway.com/api/chats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          admin_unique_id: adminId,
        }),
      });

      const data = await response.json();
      setChat(data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setLoadingChat(false);
    }
  };
  // fetch a chat

  async function fetchChat(chatId) {
    setLoadingChat(true);
    try {
      const response = await fetch(`${BASE}/chats/${chatId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch chat`);
      }

      const data = await response.json();
      setChat(data);

      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
      return null;
    } finally {
      setLoadingChat(false);
    }
  }

  // fetch an Agent
  const fetchAgent = async (id) => {
    try {
      const res = await fetch(`${BASE}/agents/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
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
        createChat,
        fetchChat,
        chat,
        fetchAgent,
        agent,
        setChat,
        loadingChat,
        createAdminChat,
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
