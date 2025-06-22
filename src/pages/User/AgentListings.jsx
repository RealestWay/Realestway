import Item from "./Item";

const AgentListings = () => {
  return (
    <div className="p-6 w-full">
      <div className="md:flex-row gap-4 flex flex-col">
        {[1, 2].map((item) => (
          <>
            <Item item={item} />
          </>
        ))}
      </div>
    </div>
  );
};

export default AgentListings;
