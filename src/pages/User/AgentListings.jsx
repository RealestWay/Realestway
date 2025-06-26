import { useState } from "react";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

const AgentListings = () => {
  const { agentHouses, isLoading } = UseHouses();
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
      <div className="mb-6 w-full flex justify-around items-center">
        <input
          type="text"
          placeholder="Search your listings..."
          className="w-3/5 md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a256] transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setOpenForm(true)}
          className="bg-[#00a256] md:w-56 text-center text-white md:px-4 p-3 md:py-4 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Listing
        </button>
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
