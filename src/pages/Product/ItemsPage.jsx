import Filter from "../../components/Filter";
import Items from "../../components/Items";
import PageNav from "../../components/PageNav";
import Spinner from "../../components/Spinner";
import { UseHouses } from "../../contexts/HouseContext";

const ItemsPage = () => {
  const { houses, isLoading, filter } = UseHouses();
  console.log(filter);
  return (
    <div>
      <PageNav />
      <div className="w-full">
        <Filter />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full sm:flex sm:flex-wrap sm:gap-3 md:gap-2 justify-between px-0 sm:px-10">
          {houses.map((house) => (
            <>
              <Items house={house} key={house.id} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
