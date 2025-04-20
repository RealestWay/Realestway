import { useOutletContext } from "react-router-dom";
import Map from "../../components/Map";

const MapDetails = () => {
  const { house } = useOutletContext();
  return (
    <div className="w-full">
      <div className="flex my-5 w-full justify-between bg-blue-600">
        <Map house={house} />
      </div>
    </div>
  );
};

export default MapDetails;
