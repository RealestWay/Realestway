import { useState } from "react";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";
import Item from "./Item";

const AgentListings = () => {
  const { agentHouses, isLoading } = UseHouses();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter houses based on title, location, or description
  const filteredHouses = agentHouses.filter((house) =>
    `${house.title} ${house.location} ${house.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 w-full">
      {/* Search Input */}
      <div className="mb-6 w-full">
        <input
          type="text"
          placeholder="Search your listings..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a256] transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Listings */}
      <div className="md:flex-row gap-4 flex flex-col">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house) => <Item key={house.id} house={house} />)
        ) : (
          <p className="text-gray-500">No matching listings found.</p>
        )}
      </div>
    </div>
  );
};

export default AgentListings;
