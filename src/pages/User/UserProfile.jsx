import Items from "../../components/Items";
import { UseHouses } from "../../contexts/HouseContext";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import HouseUploadForm from "./HouseUploadForm";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faCog } from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";
import ChatList from "./ChatList";

const UserProfile = () => {
  const [addItem, setAddItems] = useState(false);
  const [openChats, setOpenChats] = useState(false);
  const [settings, setSettings] = useState(false);
  const { houses } = UseHouses();
  const { user, logout } = useAuth();
  const house = houses.find((h) => h.agent_id === user?.id);
  const navigate = useNavigate();
  if (!user) navigate("/");
  return (
    <div>
      <div className="w-full px-6sm:px-10 flex justify-between items-center bg-gray-200">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
          <span>Back</span>
        </button>
        <div className="w-4/5 sm:px-[25%] px-[10%]">
          <span className="text-3xl sm:text-3xl font-bold color-blue-700">
            PROFILE
          </span>
        </div>
        <button
          className="p-2 sm:pr-4 text-lg text-gray-700"
          onClick={() => setSettings(!settings)}
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
        <hr />
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-2">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>

        <div className="mt-4">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>

          {user?.company && (
            <p>
              <strong>Company:</strong> {user?.company}
            </p>
          )}
        </div>
      </div>{" "}
      {settings ? (
        <UserSettings set={settings} setSet={setSettings} />
      ) : (
        <>
          {user?.company && (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <>
                <button
                  onClick={() => setAddItems(!addItem)}
                  className="w-full bg-blue-300 shadow border rounded-lg py-3 text-white"
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
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <>
              <button
                onClick={() => setOpenChats(!openChats)}
                className="w-full bg-blue-300 shadow border rounded-lg py-3 text-white"
              >
                {!openChats ? "Open Messages" : "+ Close messages"}
              </button>

              {openChats ? <ChatList /> : ""}
            </>
          </div>
        </>
      )}
      {user?.company && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-blue-700 w-full">
            Your Listed Houses
          </p>
          {house ? (
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {houses?.map((hous) =>
                hous.agent_id === user?.id ? (
                  <Items key={hous.id} house={hous} />
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
      {!user.company && (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
          <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-blue-700 w-full">
            Your Recent Inspection
          </p>
          {house ? (
            <div
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x pb-10"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {houses?.map((hous) =>
                hous.agent_id === user?.id ? (
                  <Items key={hous.id} house={hous} />
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <i className="flex justify-center w-full text-gray-400">
              No house view yet
            </i>
          )}
        </div>
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
