import Items from "../../components/Items";
import { UseHouses } from "../../contexts/HouseContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HouseUploadForm from "./HouseUploadForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCog } from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";
import ChatList from "./ChatList";
import EditHouseForm from "./EditHouseForm";
import Spinner2 from "../../components/Spinner2";

const UserProfile = () => {
  const [addItem, setAddItems] = useState(false);
  const [openChats, setOpenChats] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [settings, setSettings] = useState(false);
  const { houses, favHouse, showFavoritedHouse, loadingfav } = UseHouses();
  const { user, logout, token } = useAuth();
  const house = houses.data.find((h) => h.agent_id === user?.id);
  const navigate = useNavigate();

  if (!user) navigate("/");
  useEffect(() => {
    showFavoritedHouse(token);
  }, []);
  // Function to handle opening the modal
  const handleEditClick = (house) => {
    setSelectedHouse(house);
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-[#100073]">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#100073]  hover:bg-blue-700 transition-all"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
          <span>Back</span>
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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-2 shadow-blue-700">
        <h2 className="text-2xl font-semibold text-[#100073]">My Profile</h2>

        <div className="mt-4 text-[#100073]">
          <p>
            <strong>Name:</strong> {user?.fullname}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>

          {user?.nin && (
            <p>
              <strong>NIN:</strong> {user?.nin}
            </p>
          )}
        </div>
      </div>{" "}
      {settings ? (
        <UserSettings set={settings} setSet={setSettings} />
      ) : (
        <>
          {user?.nin && (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg rounded-b-none shadow-lg">
              <>
                <button
                  onClick={() => setAddItems(!addItem)}
                  className="bg-green-500 text-white p-3 w-full rounded-lg hover:bg-green-600 transition duration-300"
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
                className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {!openChats ? "Open Messages" : "+ Close messages"}
              </button>

              {openChats ? <ChatList /> : ""}
            </>
          </div>
        </>
      )}
      {user?.nin && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-[#100073] w-full">
            Your Listed Houses
          </p>
          {house ? (
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {houses?.map((hous) =>
                hous.agent_id === user?.id ? (
                  <Items key={hous.id} house={hous}>
                    <button
                      className="bg-blue-500 text-white px-7 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => handleEditClick(hous)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-5 py-1 rounded-lg hover:bg-red-600 transition duration-300">
                      Delete
                    </button>
                  </Items>
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <i className="flex justify-center w-full text-gray-400">
              No house listed yet
            </i>
          )}
        </div>
      )}
      {!user.nin && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-blue-700 w-full">
            Your Saved Searches
          </p>
          {favHouse ? (
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {loadingfav ? (
                <Spinner2 />
              ) : (
                favHouse?.map((hous) => <Items key={hous.id} house={hous} />)
              )}
            </div>
          ) : (
            <i className="flex justify-center w-full text-gray-400">
              No house view yet
            </i>
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
    </div>
  );
};

export default UserProfile;
