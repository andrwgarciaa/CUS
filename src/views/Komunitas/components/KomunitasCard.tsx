import { ICommunityActivity } from "../interfaces/index";
import { truncateString } from "../../../utilities";
import { COMMUNITY_ACTIVITY_URL } from "../../../constants";
import { useEffect, useState } from "react";
import {
  getCommunityActivityCategoryById,
  getCommunityActivityImagesByPlaceId,
} from "../utilities";
import { Link } from "react-router-dom";
import { IStorageImage } from "../../../interfaces";
import Spinner from "../../../components/Spinner";

const KomunitasCard = ({ item }: { item: ICommunityActivity }) => {
  const [categoryName, setCategoryName] = useState<string>();
  const [images, setImages] = useState<IStorageImage[] | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchImages = async () => {
    if (item.id) {
      const data = await getCommunityActivityImagesByPlaceId(
        item.id.toString()
      );
      setImages(data?.data);
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    const data = await getCommunityActivityCategoryById(item.id);
    if (data) setCategoryName(data.data.category);
  };

  useEffect(() => {
    fetchCategoryName();
    fetchImages();
  }, []);

  return (
    <Link
      to={"/komunitas-aktivitas/detail/" + item.id}
      className="bg-white shadow-md rounded-lg overflow-hidden w-72 h-50 flex-shrink-0 mb-2"
    >
      {!loading ? (
        <img
          className="w-full h-48 object-cover"
          src={images ? images[0].signedUrl : COMMUNITY_ACTIVITY_URL + "blank"}
          alt={item.name}
        />
      ) : (
        <Spinner />
      )}
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mr-4 truncate">
            {truncateString(item.name, 40)}
          </h3>
        </div>
        <p className="text-gray-600 truncate mb-4 italic">
          {item.motto ? truncateString(item.motto, 40) : ""}
        </p>
        <p className="text-gray-600 truncate mb-1">
          {item.type_id === 2
            ? `${item.member_count?.toString()} orang telah bergabung`
            : `Tersisa ${item.member_count?.toString()}/${
                item.member_count ? item.member_count * 2 : 0
              } slot`}
        </p>
        <div className="flex">
          <span className="text-white bg-gray-400 rounded-2xl flex w-fit items-center px-2 py-1 h-8">
            {categoryName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default KomunitasCard;
