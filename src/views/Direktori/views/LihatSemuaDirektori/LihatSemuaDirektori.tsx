import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllPlacesByCategoryId,
  getPlaceCategoryById,
} from "../../utilities";
import DirektoriCard from "../../../../components/DirektoriCard";
import { IPlace, ICategory } from "../../../../interfaces";
import { PLACE_CATEGORY_URL, PLACE_URL } from "../../../../constants";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";

const LihatSemuaDirektori = () => {
  const { id } = useParams<{ id: string }>();
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);
  const [placeCategory, setPlaceCategory] = useState<ICategory | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const placeData = await getAllPlacesByCategoryId(id);
    const placeCategoryData = await getPlaceCategoryById(id);

    setAllPlaces(placeData.data);
    setPlaceCategory(placeCategoryData.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="container mx-auto mt-10 px-4">
          <div className="relative w-full h-[512px] overflow-hidden">
            <img
              src={
                placeCategory?.has_photo
                  ? PLACE_CATEGORY_URL + placeCategory?.id
                  : PLACE_URL + "blank"
              }
              alt="Direktori Tempat"
              className="w-full h-full object-cover"
            />
          </div>
          <header className="mb-20 flex items-center mt-9">
            <div className="flex-1">
              <h1 className="text-6xl font-bold mb-2 text-left">
                {placeCategory?.category}
              </h1>
              <p className="text-xl deskripsi max-w-3xl break-words">
                {placeCategory?.description}
              </p>
            </div>
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "20px",
            }}
          >
            {allPlaces?.map((place) => (
              <DirektoriCard key={place.id} props={place} />
            ))}
          </div>
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </div>
  );
};

export default LihatSemuaDirektori;
