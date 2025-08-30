import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from "./Item";
import { Link, useOutletContext } from "react-router-dom";
import { HomeTrendUp, Money2, People, Refresh } from "iconsax-reactjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UseHouses } from "../../contexts/HouseContext";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Spinner2 from "../../components/Spinner2";
import { useChats } from "../../contexts/ChatsContext";
import { useHouseRequests } from "../../contexts/HouseRequestContext";
import { toast } from "react-toastify";

const AgentDashboard = () => {
  // House context
  const { fetchAgentHouses, agentHouses, isLoading, fetchAgent } = UseHouses();
  // Auth context
  const { agent, token, user } = useAuth();
  // Chats context
  const { chats } = useChats();
  // Outlet context for form handling
  const setOpenForm = useOutletContext();
  // House requests context
  const {
    requests,
    fetchHouseRequests,
    isLoading: isLoadingRequests,
  } = useHouseRequests();
  console.log(requests);
  // Filter and limit chats
  const validChats = chats
    ?.filter(
      (chat) => chat?.messages?.length > 0 && chat?.chatType === "house_inquiry"
    )
    .slice(0, 5);

  // Performance chart data
  const performanceData = [
    { day: "MON", value: 0 },
    { day: "TUE", value: 0 },
    { day: "WED", value: 0 },
    { day: "THU", value: 0 },
    { day: "FRI", value: 0 },
    { day: "SAT", value: 0 },
    { day: "SUN", value: 0 },
  ];

  // Fetch data on component mount
  useEffect(() => {
    if (!agent && user) fetchAgent(user?.id);
  }, [user]);

  useEffect(() => {
    if (!agentHouses && user?.id) {
      fetchAgentHouses(user.id);
    }
  }, [agent, fetchAgentHouses]);

  useEffect(() => {
    if (token) {
      fetchHouseRequests(token);
    }
  }, [token]);
  // Calculate active listings count
  const activeListingsCount = agentHouses?.filter(
    (house) => house.availability === "available"
  ).length;
  console.log(requests);
  return (
    <div className="px-6 py-4">
      {/* Listing Prompt */}
      <div className="md:flex-row flex-col gap-2 flex">
        <div className="md:w-[60%] min-h-96">
          <div className="bg-[#C3EFDA] p-4 rounded-lg flex flex-col gap-4 items-center mb-6">
            <div className="flex gap-4">
              <span className="flex gap-3 flex-col">
                <h3 className="text-lg font-semibold text-[#100073] mb-1">
                  Your next deal is one listing away.
                </h3>
                <p className="text-sm text-gray-700">
                  Post today and connect with verified renters in minutes.
                </p>
                <span className="flex justify-between">
                  <button
                    onClick={() =>
                      agent?.status !== "active"
                        ? alert(
                            `Account ${agent?.status} ${
                              agent?.status === "inactive"
                                ? "(Pending Verification)"
                                : ""
                            }`
                          )
                        : setOpenForm(true)
                    }
                    className="bg-[#00a256] h-16 md:w-56 mt-8 text-center text-white md:px-4 p-3 md:py-4 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center"
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Listing
                  </button>
                  <img
                    src="rentpic.png"
                    width={200}
                    height={200}
                    className="md:hidden inline"
                    alt="Rental illustration"
                  />
                </span>
              </span>
              <img
                src="rentpic.png"
                width={250}
                height={250}
                className="hidden md:inline"
                alt="Rental illustration"
              />
            </div>
          </div>

          {/* Status Cards */}
          <div className="md:flex-row flex flex-col md:gap-3 mb-6">
            <div className="flex gap-4 md:w-[60%]">
              <div className="bg-white p-4 rounded shadow flex flex-col gap-3">
                <p className="text text-gray-500 flex gap-2 items-center">
                  <HomeTrendUp color="#00a256" size={18} /> Active Listings
                </p>
                <h4 className="text-xl font-bold">
                  {activeListingsCount}{" "}
                  <span className="text-sm font-normal">Properties</span>
                </h4>
              </div>
              <div className="bg-white p-4 rounded shadow flex flex-col gap-3">
                <p className="text text-gray-500 flex gap-2 items-center">
                  <People color="#00a256" size={18} />
                  New Leads
                </p>
                <h4 className="text-xl font-bold">
                  {validChats?.length}{" "}
                  <span className="text-sm font-normal">New Clients</span>
                </h4>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow flex flex-col gap-3 md:w-[30%]">
              <p className="text text-gray-500 flex gap-2 items-center">
                <Money2 color="#00a256" size={18} />
                Earnings
              </p>
              <h4 className="text-xl font-bold">
                #{0} <span className="text-sm font-normal">Earned</span>
              </h4>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="mb-6 md:w-[40%]">
          <span className="flex justify-between mb-4 py-1 sm:py-0 items-center">
            <h3 className="text-lg">My Listings</h3>
            <span className="flex gap-3 items-center">
              {isLoading ? (
                <Spinner2 />
              ) : (
                <Refresh
                  color="#100073"
                  size={18}
                  onClick={() => fetchAgentHouses(agent?.id)}
                />
              )}
              <Link to={"/profile/my-listings"}>View all</Link>
            </span>
          </span>
          <div className="flex flex-col gap-4 text-sm">
            {!agent ? (
              <Spinner2 />
            ) : (
              agentHouses?.map((house, index) => (
                <Item house={house} key={`${house.id}-${index}`} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* User Requests Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between">
          {" "}
          <h3 className="text-xl p-2 mb-4">Users Requests</h3>{" "}
          <Link to={"/profile/req"}>View All</Link>
        </div>
        {isLoadingRequests ? (
          <Spinner2 />
        ) : requests.length === 0 ? (
          <p className="text-gray-500 p-2">No requests found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.slice(0, 2).map((req) => (
              <div
                key={req.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 capitalize">
                      {req.requestType} Request
                    </h4>
                    <p className="text-sm text-gray-500">
                      From: {req.fullName}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full capitalize
                    ${
                      req.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : req.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {req.status === "in_progress" ? "pending" : req.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700">
                  <strong>Property Type:</strong> {req.propertyType}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {req.location}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Details:</strong> {req.additionalDetails}
                </p>

                <p className="text-xs text-gray-500">
                  Created at: {new Date(req.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-2 mt-3">
                  {req.status === "completed" ? (
                    <></>
                  ) : (
                    <button
                      onClick={() =>
                        agent?.status !== "active"
                          ? toast.error(
                              `Account ${agent?.status} ${
                                agent?.status === "inactive"
                                  ? "(Pending Verification)"
                                  : ""
                              }`
                            )
                          : setOpenForm(true)
                      }
                      className="bg-[#00a256] md:w-56 mt-2 text-center text-white md:px-4 p-2 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Post
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Graph and Messages */}
      <div className="flex gap-3 flex-col md:flex-row w-full">
        {/* Performance Graph */}
        <div className="bg-white p-4 rounded shadow mb-6 md:w-[60%] w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Performance Overview</h3>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00a256"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white p-4 rounded shadow md:w-[40%] w-full">
          <h3 className="font-semibold mb-3">Messages</h3>
          <ul className="space-y-4">
            {validChats?.length === 0 ? (
              <p className="text-gray-500">You have no chats yet.</p>
            ) : (
              validChats?.map((chat) => {
                const lastMsg =
                  chat?.messages?.[chat?.messages?.length - 1] || {};
                return (
                  <li
                    key={chat?.id}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <img
                      src="/cs-realestway.png"
                      alt="avatar"
                      className="w-10 h-10 rounded-full bg-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {chat?.user?.fullName}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {lastMsg.sender === "me" ? "You: " : ""}
                        {lastMsg?.message || "No message"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {lastMsg.time}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
