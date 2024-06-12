import { ICommunityActivity } from "../interfaces/index";
import { truncateString } from "../../../utilities";
import { COMMUNITY_ACTIVITY_URL } from "../../../constants";
import { useEffect, useState } from "react";
import { getCommunityActivityCategoryById } from "../utilities";
import { Link } from "react-router-dom";

const KomunitasCard = ({ item }: { item: ICommunityActivity }) => {
  const [categoryName, setCategoryName] = useState<string>();

  const fetchCategoryName = async () => {
    const data = await getCommunityActivityCategoryById(item.id);
    if (data) setCategoryName(data.data.category);
  };

  useEffect(() => {
    fetchCategoryName();
  }, []);

  return (
    <Link
      to={"/komunitas-aktivitas/detail/" + item.id}
      className="bg-white shadow-md rounded-lg overflow-hidden w-72 h-50 flex-shrink-0 mb-2"
    >
      <img
        className="w-full h-48 object-cover"
        src={COMMUNITY_ACTIVITY_URL + (item.has_photo ? item.id : "blank")}
        alt={item.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mr-4 truncate">
            {truncateString(item.name, 40)}
          </h3>
        </div>
        <p className="text-gray-600 truncate mb-4 italic">
          {truncateString(item.motto, 40)}
        </p>
        <p className="text-gray-600 truncate mb-1">
          {item.member_count
            ? `${item.member_count?.toString()} orang telah bergabung`
            : `Tersisa ${item.slot_count?.toString()} slot`}
        </p>
        <div className="flex">
          <div className="px-2">
            <span className="text-white bg-gray-400 rounded-2xl flex w-fit items-center px-2 py-1 h-8">
              {categoryName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default KomunitasCard;
