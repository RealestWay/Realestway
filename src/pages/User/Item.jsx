import { faBathtub, faBed, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseCircle, Edit2, Link21, TickCircle } from "iconsax-reactjs";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";

const Item = ({ house }) => {
  const { updateHouse, deleteHouse, fetchAgentHouses } = UseHouses();
  const { token, agent } = useAuth();
  return (
    <div
      key={house.id}
      className="bg-white p-4 rounded shadow flex flex-col gap-4"
    >
      <div className="flex gap-2">
        <img src="" alt="listing" className="w-32 h-32 bg-gray-200 rounded" />
        <div className="flex flex-col gap-2">
          <span className="flex justify-between items-center">
            <h4 className="font-semibold text-md">{house?.title}</h4>{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://realestway.com/property/${house?.id}`
                );
                alert("Link copied to clipboard!");
              }}
              className="py-1 px-2 flex gap-1 text-sm items-center border-[#00a256] h-8 text-[#00a256] border-[1px] rounded-lg"
            >
              <Link21 color="#00a256" variant="Bold" size={15} />
              Share
            </button>
          </span>
          <p className="text-xs text-[#d4d4eb]">
            {house?.location?.locationAddress}
          </p>
          <ul className="flex justify-between text-xs">
            <li className="bg-[#F0F0F7] border-1 shadow-none border-[#DCDCEB] text-#0A0D17 rounded-xl py-1 px-2">
              <FontAwesomeIcon icon={faBed} color="#0A0D17" /> {house?.bedrooms}
            </li>
            <li className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
              <FontAwesomeIcon icon={faBathtub} color="#0A0D17" />{" "}
              {house?.bathrooms}
            </li>
            <li className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
              <FontAwesomeIcon icon={faHome} color="#0A0D17" />

              {house?.propertyType.toLowerCase() === "office"
                ? "Office"
                : "Apartment"}
            </li>
          </ul>
          <p className="font-semibold text-[#00a256] mb-2">₦{550000} /yr</p>
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        <button className="py-1 px-2 flex gap-1 items-center border-[#808080] border-[1px] rounded-lg">
          <Edit2 color="#808080" variant="Bold" size={15} />
          Edit
        </button>
        <button
          onClick={() => {
            deleteHouse(house.id, token);
          }}
          className="py-1 px-2 flex gap-1 items-center border-[#808080] border-[1px] rounded-lg"
        >
          <CloseCircle color="red" variant="Bold" size={15} />
          Delete
        </button>
        <button
          onClick={() => {
            const formData = new FormData();

            formData.append(
              "availability",
              house.availability === "available" ? "not-available" : "available"
            );

            updateHouse(house.id, token, formData);
            fetchAgentHouses(agent.id);
          }}
          className="py-1 px-2 border-[#00a256] flex gap-1 items-center text-[#00a256] border-[1px] rounded-lg"
        >
          <TickCircle
            color={house.availability === "available" ? "#00a256" : "red"}
            variant="Bold"
            size={15}
          />
          Mark as{" "}
          {house.availability === "available" ? "not available" : "available"}
        </button>
      </div>
    </div>
  );
};

export default Item;
