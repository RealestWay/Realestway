// Realestway Agent Dashboard UI (Complete)
// React + TailwindCSS + FontAwesome/Iconsax
// Assumes you're using Vite + Tailwind + FontAwesome setup

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from "./Item";
import { Link } from "react-router-dom";
import { HomeTrendUp, Money2, People } from "iconsax-reactjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AgentDashboard = () => {
  const performanceData = [
    { day: "MON", value: 120 },
    { day: "TUE", value: 50 },
    { day: "WED", value: 90 },
    { day: "THU", value: 75 },
    { day: "FRI", value: 180 },
    { day: "SAT", value: 220 },
    { day: "SUN", value: 160 },
  ];

  const messages = [
    { name: "Name", message: "How are we doing?", time: "2:31PM" },
    { name: "Name", message: "How are we doing?", time: "1:09PM" },
    { name: "Name", message: "How are we doing?", time: "Yesterday" },
  ];
  return (
    <div className="px-6 py-4">
      {/* Listing Prompt */}
      <div className="md:flex-row flex-col gap-2 flex">
        <div className="md:w-[60%] min-h-96">
          <div className="bg-[#C3EFDA] p-4 rounded-lg flex flex-col gap-4 items-center mb-6">
            <div className=" flex gap-4">
              <span className="flex gap-3 flex-col">
                <h3 className="text-lg font-semibold text-[#100073] mb-1">
                  Your next deal is one listing away.
                </h3>
                <p className="text-sm text-gray-700">
                  Post today and connect with verified renters in minutes.
                </p>
                <span className="flex justify-between">
                  {" "}
                  <button className="bg-[#00a256] h-16 md:w-56 mt-8 text-center text-white md:px-4 p-3 md:py-4 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center">
                    <FontAwesomeIcon icon={faPlus} /> Add Listing
                  </button>{" "}
                  <img
                    src="rentpic.png"
                    width={200}
                    height={200}
                    className="md:hidden inline"
                  />
                </span>
              </span>{" "}
              <img
                src="rentpic.png"
                width={250}
                height={250}
                className="hidden md:inline"
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
                  12 <span className="text-sm font-normal">Properties</span>
                </h4>
              </div>
              <div className="bg-white p-4 rounded shadow flex flex-col gap-3">
                <p className="text text-gray-500 flex gap-2 items-center">
                  {" "}
                  <People color="#00a256" size={18} />
                  New Leads
                </p>
                <h4 className="text-xl font-bold">
                  8 <span className="text-sm  font-normal">New Clients</span>
                </h4>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow flex flex-col gap-3 md:w-[30%]">
              <p className="text text-gray-500 flex gap-2 items-center">
                {" "}
                <Money2 color="#00a256" size={18} />
                Earnings
              </p>
              <h4 className="text-xl font-bold">
                ₦18,000 <span className="text-sm  font-normal">Earned</span>
              </h4>
            </div>
          </div>
        </div>
        {/* My Listings */}
        <div className="mb-6 md:w-[40%]">
          <span className="flex justify-between">
            {" "}
            <h3 className="text-lg mb-4">My Listings</h3>
            <Link to={"/profile/my-listings"}>View all</Link>
          </span>
          <div className="flex flex-col gap-4 text-sm">
            {[1, 2].map((item) => (
              <>
                <Item item={item} />
              </>
            ))}
          </div>
        </div>
      </div>
      {/* Earnings Overview */}
      <h3 className="text-xl p-2 mb-1">Earning Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white flex flex-col justify-between p-4 rounded shadow border-[#DCDCEB] border-[1px]">
          <span>
            <p className="text text-gray-500">Number of Houses Rented Out</p>
            <p className="text-xs text-gray-500">
              This tracks successful rental conversions.
            </p>
          </span>
          <h4 className="text-lg font-bold mt-5">12 Properties</h4>
        </div>
        <div className="bg-white flex flex-col justify-between p-4 rounded shadow border-[#DCDCEB] border-[1px]">
          <span>
            {" "}
            <p className="text-sm text-gray-500">Transaction Volume</p>
            <p className="text-xs text-gray-500">
              Total value of all transactions related to the agent.
            </p>
          </span>
          <h4 className="text-lg font-bold mt-5">₦3,250,000</h4>
        </div>
        <div className="bg-white flex flex-col justify-between p-4 rounded shadow border-[#DCDCEB] border-[1px]">
          <span>
            {" "}
            <p className="text-sm text-gray-500">Agent Earnings</p>
            <p className="text-xs text-gray-500">
              Total value of all transactions related to the agent.
            </p>
          </span>
          <h4 className="text-lg font-bold mt-5">₦280,000</h4>
        </div>
        <div className="bg-white flex flex-col justify-between p-4 rounded shadow border-[#DCDCEB] border-[1px]">
          <span>
            <p className="text-sm text-gray-500">Paid Out</p>
            <p className="text-xs text-gray-500"> Total paid from earnings.</p>
          </span>
          <h4 className="text-lg font-bold">₦180,000</h4>
        </div>
      </div>

      {/* Performance Graph */}
      <div className="flex gap-3 flex-col md:flex-row w-full">
        <div className="bg-white p-4 rounded shadow mb-6 md:w-[60%] w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Performance Overview</h3>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          {/* Insert chart component here */}
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
          <ul className="space-y-3">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`text-sm text-gray-700 ${
                  index < messages.length - 1 ? "border-b pb-2" : ""
                }`}
              >
                <span className="font-medium">{msg.name}</span> – "{msg.message}
                "<span className="text-xs text-gray-400 ml-2">{msg.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
