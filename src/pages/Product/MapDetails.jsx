import { useOutletContext } from "react-router-dom";
import Map from "../../components/Map";

const MapDetails = () => {
  const { house } = useOutletContext();
  return (
    <div className="w-full">
      <div className=" my-5 w-full ">
        <Map house={house} />
      </div>
    </div>
  );
};

export default MapDetails;
