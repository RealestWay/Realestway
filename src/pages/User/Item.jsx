import { faBathtub, faBed, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Edit2, Link21, TickCircle } from "iconsax-reactjs";

const Item = ({ item }) => {
  return (
    <div key={item} className="bg-white p-4 rounded shadow flex flex-col gap-4">
      <div className="flex gap-2">
        <img src="" alt="listing" className="w-32 h-32 bg-gray-200 rounded" />
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-md">2 Bedroom Apartment</h4>
          <p className="text-xs text-[#d4d4eb]">Location: Yaba, Lagos</p>
          <ul className="flex justify-between text-xs">
            <li className="bg-[#F0F0F7] border-1 shadow-none border-[#DCDCEB] text-#0A0D17 rounded-xl py-1 px-2">
              <FontAwesomeIcon icon={faBed} color="#0A0D17" /> {"2"}
            </li>
            <li className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
              <FontAwesomeIcon icon={faBathtub} color="#0A0D17" /> {2}
            </li>
            <li className="bg-[#F0F0F7]  border-1 shadow-none text-#0A0D17 border-[#DCDCEB] rounded-xl p-1">
              <FontAwesomeIcon icon={faHome} color="#0A0D17" />
              {"Apartment "}
              {/* {house?.propertyType.toLowerCase() === "office"
                ? "Office"
                : "Apartment"} */}
            </li>
          </ul>
          <p className="font-semibold text-[#00a256] mb-2">₦550,000/yr</p>
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        <button className="py-1 px-2 flex gap-1 items-center border-[#808080] border-[1px] rounded-lg">
          <Edit2 color="#808080" variant="Bold" size={15} />
          Edit
        </button>
        <button className="py-1 px-2 flex gap-1 items-center border-[#808080] border-[1px] rounded-lg">
          <Link21 color="#808080" variant="Bold" size={15} />
          Share
        </button>
        <button className="py-1 px-2  border-[#00a256] flex gap-1 items-center text-[#00a256] border-[1px] rounded-lg">
          <TickCircle color="#00a256" variant="Bold" size={15} /> Mark as
          Unavailable
        </button>
      </div>
    </div>
  );
};

export default Item;
