import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import { UseHouses } from "../../contexts/HouseContext";

const MapDetails = () => {
  // const [openIndex, setOpenIndex] = useState(null);
  const { id } = useParams();
  const { houses } = UseHouses();
  const house = houses.find((h) => h.id === id);
  // const toggleKeyLocations = (index) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  // const keyLocations = [
  //   {
  //     details: "Closest Bus Stops",
  //     answer: ["Eputu", "Awoyaya", "Lakowe"],
  //   },
  //   {
  //     details: "Schools Around",
  //     answer: ["UniLag", "YabaTech", "LASU"],
  //   },
  //   {
  //     details: "Resturants and Recreation locations around",
  //     answer: ["Atican Beach", "Elegusi beach"],
  //   },
  // ];
  return (
    <div className="w-full">
      <div className="flex my-5 w-full justify-between bg-blue-600">
        <Map house={house} />
        {/* <div className="sm:max-w-xl w-[30%] bg-green-500 mr-0 p-5">
          <h2 className="text-xl font-bold text-center mb-6">
            Map and Surrounding details
          </h2>
          <div className="space-y-2">
            {keyLocations.map((loc, index) => (
              <div key={index} className="shadow rounded-lg">
                <button
                  onClick={() => toggleKeyLocations(index)}
                  className="w-full text-left p-3 font-medium bg-gray-200 flex justify-between items-center"
                >
                  {loc.details}
                  <span className="text-lg">
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-white border-t border-gray-300">
                    {loc.answer.map((loc) => (
                      <p key={loc}>{loc}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MapDetails;
