import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import { UseHouses } from "../../contexts/HouseContext";

const MapDetails = () => {
  const { id } = useParams();
  const { houses } = UseHouses();
  const house = houses.find((h) => h.id === id);

  return (
    <div className="w-full">
      <div className="flex my-5 w-full justify-between bg-blue-600">
        <Map house={house} />
      </div>
    </div>
  );
};

export default MapDetails;
