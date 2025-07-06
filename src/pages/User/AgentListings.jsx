import { useState } from "react";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import { Refresh } from "iconsax-reactjs";
import { useAuth } from "../../contexts/AuthContext";

const AgentListings = () => {
  const { agentHouses, isLoading, fetchAgentHouses } = UseHouses();
  const { agent } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const setOpenForm = useOutletContext();
  // Filter houses based on title, location, or description
  const filteredHouses = agentHouses?.filter((house) =>
    `${house.title} ${house.location} ${house.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="py-6 px-3 w-full">
      {/* Search Input */}
      <div className="mb-6 w-full flex justify-between items-center">
        <input
          type="text"
          placeholder="Search your listings..."
          className="w-3/5 md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a256] transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="flex gap-8 items-center">
          <Refresh
            color="#100073"
            size={24}
            onClick={() => fetchAgentHouses(agent?.id)}
            className="hidden md:inline"
          />
          <button
            onClick={() => setOpenForm(true)}
            className="bg-[#00a256] md:w-56 text-center text-white md:px-4 p-3 md:py-4 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Listing
          </button>
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <Refresh
          color="#100073"
          size={18}
          onClick={() => fetchAgentHouses(agent?.id)}
          className="md:hidden inline"
        />{" "}
        Refresh list
      </div>
      {/* Listings */}
      <div className="md:flex-row gap-4 flex flex-col">
        {filteredHouses?.length > 0 ? (
          filteredHouses?.map((house) => <Item key={house.id} house={house} />)
        ) : (
          <p className="text-gray-500">No matching listings found.</p>
        )}
      </div>
    </div>
  );
};

export default AgentListings;
