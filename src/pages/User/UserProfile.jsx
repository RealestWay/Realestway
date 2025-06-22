import Items from "../../components/Items";
import { UseHouses } from "../../contexts/HouseContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HouseUploadForm from "./HouseUploadForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";
import ChatList from "./ChatList";
import EditHouseForm from "./EditHouseForm";
import Spinner2 from "../../components/Spinner2";
import {
  ArrowDown2,
  ArrowLeft,
  ArrowUp2,
  Edit2,
  MoneyTick,
  People,
  TickCircle,
} from "iconsax-reactjs";
import { useChats } from "../../contexts/ChatsContext";
import PageNav from "../../components/PageNav";
import Footer from "../../components/Footer";

const UserProfile = () => {
  const [addItem, setAddItems] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteHouseId, setDeleteHouseId] = useState("");
  const [openChats, setOpenChats] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [settings, setSettings] = useState(false);
  const { fetchChats } = useChats();
  const {
    favHouse,
    deleteHouse,
    showFavoritedHouse,
    loadingfav,
    isLoading,
    fetchAgentHouses,
    agentHouses,
    fetchHouses,
    success,
    setSuccess,
    updateHouse,
  } = UseHouses();
  const { user, token } = useAuth();

  const navigate = useNavigate();

  if (!user) navigate("/");
  useEffect(() => {
    user.role === "user"
      ? showFavoritedHouse(token)
      : fetchAgentHouses(user.id);

    fetchChats();
  }, []);
  // Function to handle opening the modal
  // const handleEditClick = (house) => {
  //   setSelectedHouse(house);
  //   setIsModalOpen(true);
  // };

  return (
    <div>
      <div className="w-[95%] mx-auto">
        <PageNav home={false} />
        <div className="w-full px-6 md:px-10 flex justify-center text-center items-center relative">
          <button
            className="flex items-center gap-1 md:gap-2 md:px-4 px-0 text-[#00a256] py-2 transition-all absolute left-0"
            onClick={() => navigate("/search")}
          >
            <ArrowLeft color="#00a256" size={20} />{" "}
            <span className="text-lg">Back</span>
          </button>

          <span className="text-2xl md:text-3xl font-bold color-blue-700">
            USER PROFILE
          </span>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto rounded-lg my-3 mt-8 border-[1px] bg-[#FBFDFF] shadow-sm border-[#9692ad]">
        {settings ? (
          <UserSettings set={settings} setSet={setSettings} />
        ) : (
          <div className="p-6">
            {" "}
            <h2 className="text-2xl flex justify-between items-center">
              <span> Personal Information</span>
              <button
                className="p-2 sm:pr-4 flex items-center text-sm gap-1 border-[#9692ad] border-[1px] rounded-md text-[#3D3D3D]"
                onClick={() => setSettings(!settings)}
              >
                <Edit2 color="#9692ad" variant="Bold" size={18} /> Edit
              </button>
            </h2>
            <div className="mt-4 w-[80%] md:w-2/5 flex flex-col md:gap-3 text-[#3D3D3D]">
              <p className="grid grid-cols-2">
                <span>Name</span> {user?.fullName}
              </p>
              <p className="grid grid-cols-2">
                <span>Email</span> {user?.email}
              </p>
              <p className="grid grid-cols-2">
                <span>Phone</span> {user?.phone}
              </p>

              {user?.companyName && (
                <p className="grid grid-cols-2">
                  <span>Company</span> {user?.companyName}
                </p>
              )}
            </div>
          </div>
        )}
        {/* <div className="rounded-b-lg h-4 bg-[#00a256] text-white text-xs flex justify-center">
          verified
        </div> */}
      </div>
      {user?.nin && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg rounded-b-none shadow-lg">
          <>
            <button
              onClick={() => setAddItems(!addItem)}
              className="bg-green-500 font-montserrat text-white p-3 w-full rounded-lg hover:bg-green-600 transition duration-300"
            >
              {addItem ? "Close form" : "+ Post House"}
            </button>

            {addItem ? (
              <>
                <HouseUploadForm agent={user} />
              </>
            ) : (
              ""
            )}
          </>
        </div>
      )}{" "}
      <div className="w-[95%] bg-[#FBFDFF] rounded-sm bg-[#FBFDFF] border-[#DCDCEB] md:w-[90%] mx-auto bg-white rounded-lg my-3 mt-8 border-[1px] border-[#9692ad]">
        <>
          <button
            onClick={() => setOpenChats(!openChats)}
            className="p-3 w-full px-5 transition duration-300"
          >
            <span className="flex justify-between">
              <span> Chats With {user.companyName ? "Users" : "Agents"}</span>
              {!openChats ? (
                <>
                  <ArrowUp2 size={20} />
                </>
              ) : (
                <ArrowDown2 size={20} />
              )}
            </span>
          </button>

          {!openChats ? <ChatList /> : ""}
        </>
      </div>
      <div className="flex flex-col gap-5 my-5 p-5 md:px-8 rounded-sm w-[95%] mx-auto md:w-[90%] shadow-sm border-[0.5px] bg-[#FBFDFF] border-[#DCDCEB]">
        <div className="md:flex-row w-full flex flex-col gap-8">
          <span className="md:w-[50%] flex flex-col gap-2">
            <h3 className="text-xl">Refer and Earn With Realestway</h3>
            <p className="text-sm text-justify">
              Invite friends to use Realestway. When they sign up and complete
              an action, you both get rewarded.
            </p>
          </span>
          <span className="px-3 gap-3 flex flex-col md:w-[50%]">
            <input
              disabled
              className="w-full p-2"
              value={"https://realestway.com/register?ref=myref-link-code"}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://realestway.com/register?ref=myref-link-code"
                );
                alert("Link copied to clipboard!");
              }}
              className="bg-[#00a256] w-full w-max-[100px] text-xs text-white p-2 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faLink} /> Share Link
            </button>
          </span>
        </div>
        <hr />
        <div className="flex w-full justify-evenly flex-col md:flex-row">
          <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm px-6 py-2">
            <People color="#00a256" size={24} />
            <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
              <p>Total Referrals</p>
              <p>{10}</p>
            </span>
          </div>
          <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm px-6 py-2">
            <TickCircle color="#00a256" size={24} />
            <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
              <p>Successful Referrals</p>
              <p>{10}</p>
            </span>
          </div>
          <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm  px-6 py-2">
            <MoneyTick color="#00a256" size={24} />
            <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
              <p>Total Paid</p>
              <p>{10}</p>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex justify-between gap-1">
            <h4 className="text-lg">You Available Balance</h4>{" "}
            <button className="bg-[#00a256] hidden md:inline w-max-[100px] w-[30%] text-xs text-white p-2 py-2 rounded-lg">
              Request Payout
            </button>
          </span>
          <p className="text-xs">
            You have <span className="text-lg text-[#100073]">#{"4,000"}</span>{" "}
            available payout.
          </p>
          <button className="bg-[#00a256] text-center justify-center flex md:hidden w-max-[100px] text-xs text-white p-2 py-2 rounded-lg">
            Request Payout
          </button>
        </div>
      </div>
      {user?.companyName && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-left flex text-[#100073] w-full">
            Your Listed Houses
          </p>
          {isLoading ? (
            <Spinner2 />
          ) : (
            <>
              {agentHouses ? (
                <div
                  className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {agentHouses?.map((hous) => (
                    <Items key={hous.id} house={hous}>
                      <button
                        className="bg-[#100073] font-montserrat text-white px-7 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => {
                          // Change House availability
                          const val =
                            hous.availability === "available"
                              ? "not-available"
                              : "available";

                          const formData = new FormData();
                          formData.append("availability", val);
                          updateHouse(hous.uniqueId, token, formData);
                          fetchAgentHouses(user.id);
                          fetchHouses();
                        }}
                      >
                        Click to change {hous.availability}
                      </button>
                      <span className="flex justify-between">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied to clipboard!");
                          }}
                          className="bg-[#00a256] w-max-[100px] text-xs text-white p-2 py-2 rounded-lg"
                        >
                          <FontAwesomeIcon icon={faLink} /> Share Link
                        </button>
                        <button
                          className="bg-red-500 font-montserrat text-white px-5 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                          onClick={() => {
                            setOpenDelete(true);
                            setDeleteHouseId(hous.uniqueId);
                          }}
                        >
                          Delete
                        </button>
                      </span>
                    </Items>
                  ))}
                </div>
              ) : (
                <i className="flex justify-center w-full text-gray-400">
                  No house listed yet
                </i>
              )}
            </>
          )}
        </div>
      )}
      {!user?.companyName && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-blue-700 w-full">
            Your Saved Searches
          </p>
          {isLoading ? (
            <Spinner2 />
          ) : (
            <>
              {favHouse ? (
                <div
                  className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {loadingfav ? (
                    <Spinner2 />
                  ) : (
                    favHouse?.map((hous) => (
                      <Items key={hous.id} house={hous} />
                    ))
                  )}
                </div>
              ) : (
                <i className="flex justify-center w-full text-gray-400">
                  No house view yet
                </i>
              )}
            </>
          )}
        </div>
      )}
      {/* Edit House Modal */}
      {isModalOpen && (
        <EditHouseForm
          house={selectedHouse}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          setSelectedHouse={setSelectedHouse}
        />
      )}
      {openDelete && (
        <Confirm
          setOpenDelete={setOpenDelete}
          deleteHouse={deleteHouse}
          deleteHouseId={deleteHouseId}
          token={token}
          fetchAgentHouses={fetchAgentHouses}
          success={success}
          setSuccess={setSuccess}
          isLoading={isLoading}
          user={user}
          fetchHouses={fetchHouses}
        />
      )}
      <Footer />
    </div>
  );
};

const Confirm = ({
  deleteHouse,
  deleteHouseId,
  token,
  setOpenDelete,
  fetchAgentHouses,
  success,
  setSuccess,
  isLoading,
  user,
  fetchHouses,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "300px",
          textAlign: "center",
        }}
      >
        <div className="w-full flex items-end">
          <FontAwesomeIcon
            icon={faTimes}
            color="red"
            className="flex flex-end"
            onClick={() => {
              setOpenDelete(false);
              setSuccess("");
              fetchAgentHouses(user.id);
              fetchHouses();
            }}
          />
        </div>
        <div>
          <p className="text-[#100073]">Confirm Delete</p>
          <div className="flex justify-around gap-3">
            {isLoading ? (
              <Spinner2 />
            ) : (
              <>
                {success ? (
                  <p className="text-[#00a256]">{success}</p>
                ) : (
                  <>
                    <button
                      className="bg-red-600 font-montserrat text-white py-2 px-4"
                      onClick={() => {
                        deleteHouse(deleteHouseId, token);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="border-[#100073] font-montserrat text-[#100073] border-1 py-2 px-4"
                      onClick={() => setOpenDelete(false)}
                    >
                      Close
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLink, faTimes } from "@fortawesome/free-solid-svg-icons";
// import {
//   ArrowDown2,
//   ArrowLeft,
//   ArrowUp2,
//   Edit2,
//   MoneyTick,
//   People,
//   TickCircle,
// } from "iconsax-reactjs";

// import Items from "../../components/Items";
// import HouseUploadForm from "./HouseUploadForm";
// import UserSettings from "./UserSettings";
// import ChatList from "./ChatList";
// import Spinner2 from "../../components/Spinner2";
// import PageNav from "../../components/PageNav";
// import Footer from "../../components/Footer";
// import ChatBox from "../../Chat/ChatBox";

// const UserProfile = () => {
//   const [addItem, setAddItems] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteHouseId, setDeleteHouseId] = useState("");
//   const [openChats, setOpenChats] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedHouse, setSelectedHouse] = useState(null);
//   const [settings, setSettings] = useState(false);

//   const [chatbox, setChatBox] = useState(false);
//   const user = {
//     id: "A12345",
//     fullName: "Agent John Doe",
//     email: "agent@example.com",
//     phone: "08123456789",
//     companyName: "Real Homes Ltd.",
//     nin: "12345678901",
//   };
//   const token = "dummy-token";

//   const agentHouses = [
//     {
//       id: 1,
//       uniqueId: "house-001",
//       availability: "available",
//       title: "2 Bedroom Flat in Yaba",
//       price: 250000,
//       location: "Lagos",
//     },
//   ];

//   const isLoading = false;
//   const success = "";
//   const setSuccess = () => {};
//   const deleteHouse = () => {};
//   const fetchHouses = () => {};
//   const fetchAgentHouses = () => {};
//   const updateHouse = () => {};

//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Simulated agent profile loaded.");
//   }, []);

//   return (
//     <div>
//       <div className="w-[95%] mx-auto">
//         <PageNav home={false} />
//         <div className="w-full px-6 md:px-10 flex justify-center text-center items-center relative">
//           <button
//             className="flex items-center gap-1 md:gap-2 md:px-4 px-0 text-[#00a256] py-2 transition-all absolute left-0"
//             onClick={() => navigate("/search")}
//           >
//             <ArrowLeft color="#00a256" size={20} />
//             <span className="text-lg">Back</span>
//           </button>
//           <span className="text-2xl md:text-3xl font-bold color-blue-700">
//             USER PROFILE
//           </span>
//         </div>
//       </div>

//       <div className="w-[95%] md:w-[90%] mx-auto shadow-sm bg-white rounded-lg my-3 mt-8 border-[1px] border-[#9692ad]">
//         {settings ? (
//           <UserSettings set={settings} setSet={setSettings} />
//         ) : (
//           <div className="p-6">
//             <h2 className="text-2xl flex justify-between items-center">
//               <span> Personal Information</span>
//               <button
//                 className="p-2 sm:pr-4 flex items-center text-sm gap-1 border-[#9692ad] border-[1px] rounded-md text-[#3D3D3D]"
//                 onClick={() => setSettings(!settings)}
//               >
//                 <Edit2 color="#9692ad" variant="Bold" size={18} /> Edit
//               </button>
//             </h2>
//             <div className="mt-4 w-[80%] md:w-2/5 flex flex-col md:gap-3 text-[#3D3D3D]">
//               <p className="grid grid-cols-[1fr_2fr]">
//                 <span>Name</span> {user.fullName}
//               </p>
//               <p className="grid grid-cols-[1fr_2fr]">
//                 <span>Email</span> {user.email}
//               </p>
//               <p className="grid grid-cols-[1fr_2fr]">
//                 <span>Phone</span> {user.phone}
//               </p>
//               <p className="grid grid-cols-[1fr_2fr]">
//                 <span>Company</span> {user.companyName}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {user.nin && (
//         <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg rounded-b-none shadow-lg">
//           <button
//             onClick={() => setAddItems(!addItem)}
//             className="bg-green-500 font-montserrat text-white p-3 w-full rounded-lg hover:bg-green-600 transition duration-300"
//           >
//             {addItem ? "Close form" : "+ Post House"}
//           </button>
//           {addItem && <HouseUploadForm agent={user} />}
//         </div>
//       )}

//       <div className="w-[95%] rounded-sm md:w-[90%] bg-[#FBFDFF] mx-auto bg-white my-3 mt-8 border-[1px] border-[#9692ad]">
//         <button
//           onClick={() => setOpenChats(!openChats)}
//           className="p-3 w-full px-5 transition duration-300"
//         >
//           <span className="flex justify-between">
//             <span>Chats With Users</span>
//             {!openChats ? <ArrowUp2 size={20} /> : <ArrowDown2 size={20} />}
//           </span>
//         </button>
//         {!openChats && <ChatList />}
//         <button
//           onClick={() => setChatBox(!chatbox)}
//           className="bg-[#00a256] p-3 rounded-md"
//         >
//           {chatbox ? "Close Chat" : "Open Chat"}
//         </button>
//       </div>

//       <div className="flex flex-col gap-5 my-5 p-5 md:px-8 rounded-sm w-[95%] mx-auto md:w-[90%] shadow-sm border-[0.5px] bg-[#FBFDFF] border-[#DCDCEB]">
//         <div className="md:flex-row w-full flex flex-col gap-8">
//           <span className="md:w-[50%] flex flex-col gap-2">
//             <h3 className="text-xl">Refer and Earn With Realestway</h3>
//             <p className="text-sm text-justify">
//               Invite friends to use Realestway. When they sign up and complete
//               an action, you both get rewarded.
//             </p>
//           </span>
//           <span className="px-3 gap-3 flex flex-col md:w-[50%]">
//             <input
//               disabled
//               className="w-full p-2"
//               value={"https://realestway.com/register?ref=myref-link-code"}
//             />
//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(
//                   "https://realestway.com/register?ref=myref-link-code"
//                 );
//                 alert("Link copied to clipboard!");
//               }}
//               className="bg-[#00a256] w-full w-max-[100px] text-xs text-white p-2 py-2 rounded-lg"
//             >
//               <FontAwesomeIcon icon={faLink} /> Share Link
//             </button>
//           </span>
//         </div>
//         <hr />
//         <div className="flex w-full justify-evenly flex-col md:flex-row">
//           <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm px-6 py-2">
//             <People color="#00a256" size={24} />
//             <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
//               <p>Total Referrals</p>
//               <p>{10}</p>
//             </span>
//           </div>
//           <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm px-6 py-2">
//             <TickCircle color="#00a256" size={24} />
//             <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
//               <p>Successful Referrals</p>
//               <p>{10}</p>
//             </span>
//           </div>
//           <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm  px-6 py-2">
//             <MoneyTick color="#00a256" size={24} />
//             <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
//               <p>Total Paid</p>
//               <p>{10}</p>
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col gap-1">
//           <span className="flex justify-between gap-1">
//             <h4 className="text-lg">You Available Balance</h4>{" "}
//             <button className="bg-[#00a256] hidden md:inline w-max-[100px] w-[30%] text-xs text-white p-2 py-2 rounded-lg">
//               Request Payout
//             </button>
//           </span>
//           <p className="text-xs">
//             You have <span className="text-lg text-[#100073]">#{"4,000"}</span>{" "}
//             available payout.
//           </p>
//           <button className="bg-[#00a256] text-center justify-center flex md:hidden w-max-[100px] text-xs text-white p-2 py-2 rounded-lg">
//             Request Payout
//           </button>
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
//         <p className="font-bold text-xl border-0 border-b-2 justify-left flex text-[#100073] w-full">
//           Your Listed Houses
//         </p>
//         {isLoading ? (
//           <Spinner2 />
//         ) : (
//           <>
//             {agentHouses.length > 0 ? (
//               <div
//                 className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
//                 style={{ scrollSnapType: "x mandatory" }}
//               >
//                 {agentHouses.map((hous) => (
//                   <Items key={hous.id} house={hous}>
//                     <button
//                       className="bg-[#100073] font-montserrat text-white px-7 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
//                       onClick={() => {
//                         const val =
//                           hous.availability === "available"
//                             ? "not-available"
//                             : "available";
//                         const formData = new FormData();
//                         formData.append("availability", val);
//                         updateHouse(hous.uniqueId, token, formData);
//                       }}
//                     >
//                       Click to change {hous.availability}
//                     </button>
//                     <span className="flex justify-between">
//                       <button
//                         onClick={() => {
//                           navigator.clipboard.writeText(window.location.href);
//                           alert("Link copied to clipboard!");
//                         }}
//                         className="bg-[#00a256] w-max-[100px] text-xs text-white p-2 py-2 rounded-lg"
//                       >
//                         <FontAwesomeIcon icon={faLink} /> Share Link
//                       </button>
//                       <button
//                         className="bg-red-500 font-montserrat text-white px-5 py-1 rounded-lg hover:bg-red-600 transition duration-300"
//                         onClick={() => {
//                           setOpenDelete(true);
//                           setDeleteHouseId(hous.uniqueId);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </span>
//                   </Items>
//                 ))}
//               </div>
//             ) : (
//               <i className="flex justify-center w-full text-gray-400">
//                 No house listed yet
//               </i>
//             )}
//           </>
//         )}
//       </div>
//       {chatbox && <ChatBox setChatBox={setChatBox} />}
//       {isModalOpen && (
//         <EditHouseForm
//           house={selectedHouse}
//           isOpen={isModalOpen}
//           setIsOpen={setIsModalOpen}
//           setSelectedHouse={setSelectedHouse}
//         />
//       )}

//       {openDelete && (
//         <Confirm
//           setOpenDelete={setOpenDelete}
//           deleteHouse={deleteHouse}
//           deleteHouseId={deleteHouseId}
//           token={token}
//           fetchAgentHouses={fetchAgentHouses}
//           success={success}
//           setSuccess={setSuccess}
//           isLoading={isLoading}
//           user={user}
//           fetchHouses={fetchHouses}
//         />
//       )}

//       <Footer />
//     </div>
//   );
// };

// const Confirm = ({
//   deleteHouse,
//   deleteHouseId,
//   token,
//   setOpenDelete,
//   fetchAgentHouses,
//   success,
//   setSuccess,
//   isLoading,
//   user,
//   fetchHouses,
// }) => {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: 20,
//           borderRadius: 8,
//           width: "300px",
//           textAlign: "center",
//         }}
//       >
//         <div className="w-full flex items-end">
//           <FontAwesomeIcon
//             icon={faTimes}
//             color="red"
//             className="flex flex-end"
//             onClick={() => {
//               setOpenDelete(false);
//               setSuccess("");
//               fetchAgentHouses(user.id);
//               fetchHouses();
//             }}
//           />
//         </div>
//         <div>
//           <p className="text-[#100073]">Confirm Delete</p>
//           <div className="flex justify-around gap-3">
//             {isLoading ? (
//               <Spinner2 />
//             ) : (
//               <>
//                 {success ? (
//                   <p className="text-[#00a256]">{success}</p>
//                 ) : (
//                   <>
//                     <button
//                       className="bg-red-600 font-montserrat text-white py-2 px-4"
//                       onClick={() => {
//                         deleteHouse(deleteHouseId, token);
//                       }}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="border-[#100073] font-montserrat text-[#100073] border-1 py-2 px-4"
//                       onClick={() => setOpenDelete(false)}
//                     >
//                       Close
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
