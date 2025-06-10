import Items from "../../components/Items";
import { UseHouses } from "../../contexts/HouseContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HouseUploadForm from "./HouseUploadForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faCog,
  faLink,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";
import ChatList from "./ChatList";
import EditHouseForm from "./EditHouseForm";
import Spinner2 from "../../components/Spinner2";
import { ArrowCircleDown, ArrowCircleUp, TickCircle } from "iconsax-reactjs";
import { useChats } from "../../contexts/ChatsContext";

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
  const { user, logout, token } = useAuth();

  const navigate = useNavigate();

  if (!user) navigate("/");
  useEffect(() => {
    user.id.startsWith("U")
      ? showFavoritedHouse(token)
      : fetchAgentHouses(user.id);

    fetchChats();
  }, []);
  // Function to handle opening the modal
  // const handleEditClick = (house) => {
  //   setSelectedHouse(house);
  //   setIsModalOpen(true);
  // };

  // Change House availability
  const formData = new FormData();
  formData.append("availability", "not-available");
  const chatstyle = `${
    !openChats ? "rounded-t-lg" : "rounded-lg"
  } bg-[#100073] font-montserrat text-white p-3 w-full px-5 transition duration-300`;

  return (
    <div>
      <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-[#100073]">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#100073]  hover:bg-blue-700 transition-all"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
        </button>
        <div className="w-4/5 md:px-[34%] sm:px-[28%] px-[12%]">
          <span className="text-3xl sm:text-3xl font-bold color-blue-700">
            PROFILE
          </span>
        </div>
        <button
          className="p-2 sm:pr-4 text-lg text-gray-700"
          onClick={() => setSettings(!settings)}
        >
          <FontAwesomeIcon icon={faCog} color="white" />
        </button>
        <hr />
      </div>
      <div className="max-w-4xl mx-auto  bg-white rounded-lg shadow-lg my-2 shadow-blue-700">
        <div className="p-6">
          {" "}
          <h2 className="text-2xl flex gap-5 items-center font-semibold text-[#100073]">
            <span> My Profile</span>{" "}
            {user.emailVerified && (
              <TickCircle color="#100073" variant="Bold" />
            )}
          </h2>
          <div className="mt-4 text-[#100073]">
            <p>
              <strong>Name:</strong> {user?.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>

            {user?.companyName && (
              <p>
                <strong>Company:</strong> {user?.companyName}
              </p>
            )}
          </div>
        </div>
        {/* <div className="rounded-b-lg h-4 bg-[#00a256] text-white text-xs flex justify-center">
          verified
        </div> */}
      </div>
      {settings ? (
        <UserSettings set={settings} setSet={setSettings} />
      ) : (
        <>
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
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg rounded-t-none shadow-lg">
            <>
              <button
                onClick={() => setOpenChats(!openChats)}
                className={chatstyle}
              >
                <span className="flex justify-between">
                  <span> Chats</span>
                  {!openChats ? (
                    <>
                      <ArrowCircleUp size={20} />
                    </>
                  ) : (
                    <ArrowCircleDown size={20} />
                  )}
                </span>
              </button>

              {!openChats ? <ChatList /> : ""}
            </>
          </div>
        </>
      )}
      {user?.companyName && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-[#100073] w-full">
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
                          updateHouse(hous.uniqueId, token, formData);
                          fetchAgentHouses(user.id);
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
      <button
        onClick={logout}
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2 text-red-600 font-bold flex items-center mb-10"
      >
        Sign Out
      </button>
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
