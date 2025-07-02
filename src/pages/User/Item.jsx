import {
  faBathtub,
  faBed,
  faHome,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloseCircle, Edit2, Link21, TickCircle } from "iconsax-reactjs";
import { UseHouses } from "../../contexts/HouseContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Spinner2 from "../../components/Spinner2";

const Item = ({ house }) => {
  const { updateHouse, deleteHouse, fetchAgentHouses, fetchHouses } =
    UseHouses();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteHouseId, setDeleteHouseId] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuth();
  console.log(token);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteHouse(deleteHouseId, token);
      setSuccess("House deleted successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const images = house?.medias?.filter((media) => media.type === "image");
  const video = house?.medias?.filter((media) => media.type === "video")[0];
  const videoUrl = `https://backend.realestway.com/storage/${video?.path}`;
  return (
    <div
      key={house?.id}
      className="bg-white p-4 rounded min-w-[350px]  md:min-w-[400px] shadow flex flex-col gap-4 relative"
    >
      {openDelete && (
        <Confirm
          deleteHouse={handleDelete}
          token={token}
          setOpenDelete={setOpenDelete}
          fetchAgentHouses={fetchAgentHouses}
          success={success}
          setSuccess={setSuccess}
          isLoading={isLoading}
          user={user}
          fetchHouses={fetchHouses}
        />
      )}

      <div className="flex gap-2">
        {images.length > 0 ? (
          <img
            src={`https://backend.realestway.com/storage/${house?.medias[0]?.path}`}
            alt="listing"
            className="w-1/2 h-32 bg-gray-200 rounded"
          />
        ) : (
          <>
            {" "}
            <video
              width="50%"
              controls
              className="rounded-lg h-[400px] shadow-md relative mt-2"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}
        <div className="flex flex-col gap-2 w-1/2">
          <span className="flex justify-between">
            <h4 className="font-semibold text-md">{house?.title}</h4>{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://realestway.com/property/${house?.id}`
                );
                alert("Link copied to clipboard!");
              }}
              className="py-1 px-1 flex gap-1 text-sm items-center border-[#00a256] h-8 text-[#00a256] border-[1px] rounded-lg"
            >
              <Link21 color="#00a256" variant="Bold" size={15} />
              Share
            </button>
          </span>
          <p className="text-xs text-[#9595c1]">{house?.location?.address}</p>
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
          <p className="font-semibold text-[#00a256] mb-2">
            ₦{house?.totalPrice.toLocaleString()} /total
          </p>
        </div>
      </div>
      <div className="flex gap-2 text-xs">
        <button className="py-1 px-2 flex gap-1 items-center border-[#808080] border-[1px] rounded-lg">
          <Edit2 color="#808080" variant="Bold" size={15} />
          Edit
        </button>
        <button
          onClick={() => {
            setOpenDelete(true);
            setDeleteHouseId(house?.id);
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
              house?.availability === "available"
                ? "not-available"
                : "available"
            );
            updateHouse(house.id, token, formData);
            fetchAgentHouses(user.id);
          }}
          className="py-1 px-2 border-[#00a256] flex gap-1 items-center text-[#00a256] border-[1px] rounded-lg"
        >
          <TickCircle
            color={house?.availability === "available" ? "#00a256" : "red"}
            variant="Bold"
            size={15}
          />
          Mark as{" "}
          {house?.availability === "available" ? "not available" : "available"}
        </button>
      </div>
    </div>
  );
};

const Confirm = ({
  deleteHouse,
  setOpenDelete,
  fetchAgentHouses,
  success,
  setSuccess,
  isLoading,
  user,
  fetchHouses,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "300px",
          textAlign: "center",
        }}
      >
        <div className="w-full flex justify-end">
          <FontAwesomeIcon
            icon={faTimes}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              setOpenDelete(false);
              setSuccess("");
              fetchAgentHouses(user.id);
              fetchHouses();
            }}
          />
        </div>
        <div>
          <p className="text-[#100073]">Confirm Delete</p>
          <div className="flex justify-around gap-3 mt-4">
            {isLoading ? (
              <Spinner2 />
            ) : success ? (
              <p className="text-[#00a256]">{success}</p>
            ) : (
              <>
                <button
                  className="bg-red-600 font-montserrat text-white py-2 px-4 rounded"
                  onClick={deleteHouse}
                >
                  Delete
                </button>
                <button
                  className="border-[#100073] font-montserrat text-[#100073] border py-2 px-4 rounded"
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
