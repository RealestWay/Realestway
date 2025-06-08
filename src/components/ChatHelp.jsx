// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCommentDots,
//   faPaperPlane,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import { useChats } from "../contexts/ChatsContext";
// import { useAuth } from "../contexts/AuthContext";

// const ChatHelp = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const {  chats, fetchChat, chat, setChat } = useChats();
//   const { token, user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const existingChat = chats?.find((chat) => chat.admin_id === "USR-00001");
//   console.log(existingChat);
//   useEffect(() => {
//     if (chat?.data?.messages && Array.isArray(chat.data.messages)) {
//       setMessages(chat.data.messages);
//     }

//     const interval = setInterval(() => {
//       if (chat?.data?.id) {
//         fetchChat(chat.data.id);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [chat?.data?.id]);

//   const handleChat = async () => {
//     if (!newMessage.trim()) return;

//     const newMsg = {
//       sender_id: user.id,
//       id: messages?.length + 1,
//       message: newMessage,
//     };

//     setMessages([...messages, newMsg]);
//     setNewMessage("");

//     try {
//       const response = await fetch(
//         `https://backend.realestway.com/api/chats/${chat.data.id}/messages`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `bearer ${token}`,
//           },
//           body: JSON.stringify({ message: newMessage }),
//         }
//       );

//       if (!response.ok) {
//         console.error("Failed to send message");
//       } else {
//         const result = await response.json();
//         console.log("Message sent:", result);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const createChat = async (adminId) => {
//     setLoadingChat(true);
//     try {
//       const response = await fetch("https://backend.realestway.com/api/chats", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `bearer ${token}`,
//         },
//         body: JSON.stringify({
//           admin_unique_id: adminId,
//         }),
//       });

//       const data = await response.json();
//       setChat(data);
//     } catch (error) {
//       console.error("Failed to fetch chats:", error);
//     } finally {
//       setLoadingChat(false);
//     }
//   };
//   return (
//     <div className="fixed bottom-5 right-5 flex flex-col items-end animate-fade-in">
//       {!isOpen && (
//         <button
//           className="bg-[#100073] text-white p-4 rounded-full shadow-lg hover:bg-[#4331bdd8] transition"
//           onClick={async () => {
//             setIsOpen(true);
//             if (existingChat) {
//               await fetchChat(existingChat.id);
//             } else {
//               await createChat("USR-00001");
//             }
//           }}
//         >
//           <FontAwesomeIcon icon={faCommentDots} size="xl" />
//         </button>
//       )}

//       {isOpen && chat?.data && (
//         <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="bg-[#100073] text-white p-3 flex justify-between items-center">
//             <div className="flex gap-3">
//               <img
//                 src="/cs-realestway.png"
//                 width={50}
//                 height={50}
//                 className="rounded-full"
//               />
//               <div>
//                 <span className="font-semibold block">Chat Support</span>
//                 <span className="text-xs">support@realestway.com</span>
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </button>
//           </div>

//           <div className="p-3 h-60 overflow-y-auto space-y-3 flex flex-col">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg max-w-xs ${
//                   msg.sender_id === user.id
//                     ? "bg-[#100073] text-white self-end"
//                     : "bg-[#00A256] text-white self-start"
//                 }`}
//               >
//                 {msg.message}
//               </div>
//             ))}
//           </div>

//           <div className="flex p-2 border-t">
//             <input
//               type="text"
//               className="flex-grow p-2 border rounded-l-lg focus:outline-none"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleChat()}
//             />
//             <button
//               className="bg-[#100073] text-white px-4 rounded-r-lg"
//               onClick={handleChat}
//             >
//               <FontAwesomeIcon icon={faPaperPlane} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHelp;

// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCommentDots,
//   faPaperPlane,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import { useChats } from "../contexts/ChatsContext";
// import { useAuth } from "../contexts/AuthContext";

// const ChatHelp = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { createChat, chats, fetchChat, chat } = useChats();
//   const { token, user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const existingChat = chats?.find((chat) => chat.admin_id === "USR-00001");
//   console.log(existingChat);
//   useEffect(() => {
//     if (chat?.data?.messages && Array.isArray(chat.data.messages)) {
//       setMessages(chat.data.messages);
//     }

//     const interval = setInterval(() => {
//       if (chat?.data?.id) {
//         fetchChat(chat.data.id);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [chat?.data?.id]);

//   const handleChat = async () => {
//     if (!newMessage.trim()) return;

//     const newMsg = {
//       sender_id: user.id,
//       id: messages?.length + 1,
//       message: newMessage,
//     };

//     setMessages([...messages, newMsg]);
//     setNewMessage("");

//     try {
//       const response = await fetch(
//         `https://backend.realestway.com/api/chats/${chat.data.id}/messages`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `bearer ${token}`,
//           },
//           body: JSON.stringify({ message: newMessage }),
//         }
//       );

//       if (!response.ok) {
//         console.error("Failed to send message");
//       } else {
//         const result = await response.json();
//         console.log("Message sent:", result);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 flex flex-col items-end animate-fade-in">
//       {!isOpen && (
//         <button
//           className="bg-[#100073] text-white p-4 rounded-full shadow-lg hover:bg-[#4331bdd8] transition"
//           onClick={async () => {
//
//             if (existingChat) {
//               await fetchChat(existingChat.id);
// setIsOpen(true);
//             } else {
//               await createChat("USR-00001");setIsOpen(true);
//             }
//           }}
//         >
//           <FontAwesomeIcon icon={faCommentDots} size="xl" />
//         </button>
//       )}

//       {isOpen && chat?.data && (
//         <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="bg-[#100073] text-white p-3 flex justify-between items-center">
//             <div className="flex gap-3">
//               <img
//                 src="/cs-realestway.png"
//                 width={50}
//                 height={50}
//                 className="rounded-full"
//               />
//               <div>
//                 <span className="font-semibold block">Chat Support</span>
//                 <span className="text-xs">support@realestway.com</span>
//               </div>
//             </div>
//             <button onClick={() => setIsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </button>
//           </div>

//           <div className="p-3 h-60 overflow-y-auto space-y-3 flex flex-col">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg max-w-xs ${
//                   msg.sender_id === user.id
//                     ? "bg-[#100073] text-white self-end"
//                     : "bg-[#00A256] text-white self-start"
//                 }`}
//               >
//                 {msg.message}
//               </div>
//             ))}
//           </div>

//           <div className="flex p-2 border-t">
//             <input
//               type="text"
//               className="flex-grow p-2 border rounded-l-lg focus:outline-none"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleChat()}
//             />
//             <button
//               className="bg-[#100073] text-white px-4 rounded-r-lg"
//               onClick={handleChat}
//             >
//               <FontAwesomeIcon icon={faPaperPlane} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHelp;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ChatHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      message: "Hi there! How can we help you today?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleChat = () => {
    if (!newMessage.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "support",
          message: "Thanks for reaching out! We'll get back to you shortly.",
        },
      ]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end animate-fade-in z-50">
      {!isOpen && (
        <button
          className="bg-[#100073] text-white p-4 rounded-full shadow-lg hover:bg-[#4331bdd8] transition"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faCommentDots} size="xl" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#100073] text-white p-3 flex justify-between items-center">
            <div className="flex gap-3">
              <img
                src="/cs-realestway.png"
                width={50}
                height={50}
                className="rounded-full"
                alt="Support"
              />
              <div>
                <span className="font-semibold block">Chat Support</span>
                <span className="text-xs">support@realestway.com</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-60 overflow-y-auto space-y-3 flex flex-col">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-[#100073] text-white self-end"
                    : "bg-[#00A256] text-white self-start"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          {/* Input Field */}
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
              className="bg-[#100073] text-white px-4 rounded-r-lg"
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
