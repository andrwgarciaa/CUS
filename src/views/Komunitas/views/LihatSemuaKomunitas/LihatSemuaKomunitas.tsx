import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KomunitasCard from "../../components/KomunitasCard";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";
import { ICommunityActivity } from "../../interfaces";
import {
  getCommunityActivityByTypeId,
  getCommunityActivityCategoryById,
} from "../../utilities";
import { ICategory } from "../../../../interfaces";
import { PLACE_CATEGORY_URL, PLACE_URL } from "../../../../constants";
const LihatSemuaKomunitas = () => {
  const { id } = useParams<{ id: string }>();
  const [allCommunityActivity, setAllCommunityActivity] = useState<
    ICommunityActivity[] | null
  >([]);
  const [communityActivityType, setCommunityActivityType] =
    useState<ICategory | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(false);
    const data = await getCommunityActivityByTypeId(id);
    const categoryData = await getCommunityActivityCategoryById(id);
    if (data.data) setAllCommunityActivity(data.data);
    if (categoryData.data) setCommunityActivityType(categoryData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="container mx-auto mt-10 px-4">
          <header className="mb-20 flex items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {communityActivityType?.category}
              </h1>
              <p className="deskripsi max-w-3xl break-words text-justify">
                {communityActivityType?.description}
              </p>
            </div>
            <img
              src={
                communityActivityType?.has_photo
                  ? PLACE_CATEGORY_URL + communityActivityType?.id
                  : PLACE_URL + "blank"
              }
              alt="Direktori Tempat"
              className="rounded-lg shadow-md"
              style={{ width: "35%", height: "40%", objectFit: "cover" }}
            />
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "20px",
            }}
          >
            {allCommunityActivity?.map((item) => (
              <KomunitasCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </div>
  );
};

export default LihatSemuaKomunitas;
