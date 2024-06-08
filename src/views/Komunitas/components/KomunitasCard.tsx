import { truncateString } from "../../../utilities";

const KomunitasCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 h-50 flex-shrink-0 mb-2">
      <img
        className="w-full h-48 object-cover"
        src={
          "https://images.pexels.com/photos/2962035/pexels-photo-2962035.jpeg"
        }
        alt={""}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-4 mr-4 truncate">
            {truncateString("aaa", 40)}
          </h3>
          <div className="flex w-fit items-center bg-green-500 rounded-2xl px-2 py-1 h-8">
            <span className="text-white">{"rating"}★</span>
          </div>
        </div>
      </div>
    </div>
  );
};
