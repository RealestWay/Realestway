import Items from "../../components/Items";
import { UseHouses } from "../../contexts/HouseContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import UserSettings from "./UserSettings";
import ChatList from "./ChatList";
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
import ChatBox from "../../Chat/ChatBox";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [openChats, setOpenChats] = useState(false);
  const [settings, setSettings] = useState(false);
  const [chatbox, setChatBox] = useState(false);
  const { fetchChats } = useChats();
  const { favHouse, showFavoritedHouse, loadingfav, isLoading } = UseHouses();
  const { user, token, refs, fetchAllreferral } = useAuth();

  const navigate = useNavigate();

  if (!user) navigate("/");
  useEffect(() => {
    showFavoritedHouse(token);
    fetchChats();
    fetchAllreferral();
  }, [user, token]);

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
      {/* 
          
      //Profile and profile setting
       
       */}
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
            </div>
          </div>
        )}
        {/* <div className="rounded-b-lg h-4 bg-[#00a256] text-white text-xs flex justify-center">
          verified
        </div> */}
      </div>
      <div className="w-[95%] bg-[#FBFDFF] border-[#DCDCEB] md:w-[90%] mx-auto rounded-lg my-3 mt-8 border-[1px]">
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

          {!openChats ? (
            <ChatList chatbox={chatbox} setChatBox={setChatBox} />
          ) : (
            ""
          )}
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
            <input disabled className="w-full p-2" value={refs.referral_link} />
            <button
              onClick={() => {
                navigator.clipboard.writeText(refs.referral_link);
                toast.success("Link copied to clipboard!");
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
              <p>{refs ? refs.total_referrals : 0}</p>
            </span>
          </div>
          <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm px-6 py-2">
            <TickCircle color="#00a256" size={24} />
            <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
              <p>Pending Referrals</p>
              <p>{refs ? refs.pending_referrals : 0}</p>
            </span>
          </div>
          <div className="flex gap-4 bg-[#F9FBFF] shadow-sm border-[#DCDCEB] border-[1px] rounded-sm  px-6 py-2">
            <MoneyTick color="#00a256" size={24} />
            <span className="flex md:flex-col justify-between w-full gap-3 text-xl">
              <p>Completed Referrals</p>
              <p>{refs ? refs.completed_referrals : 0}</p>
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
            You have{" "}
            <span className="text-lg text-[#100073]">
              #{refs ? refs.total_rewards : 0}
            </span>{" "}
            available payout.
          </p>
          <button className="bg-[#00a256] text-center justify-center flex md:hidden w-max-[100px] text-xs text-white p-2 py-2 rounded-lg">
            Request Payout
          </button>
        </div>
      </div>
      {chatbox && <ChatBox setChatBox={setChatBox} />}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 pb-2">
        <p className="font-bold text-xl border-0 border-b-2 justify-center flex text-blue-700 w-full">
          Your Saved Searches
        </p>
        {isLoading ? (
          <Spinner2 />
        ) : (
          <div>
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
                No house saved yet
              </i>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
