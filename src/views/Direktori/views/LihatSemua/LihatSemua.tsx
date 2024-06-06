import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllPlacesByCategoryId,
  getPlaceCategoryById,
} from "../../../../utilities";
import DirektoriCard from "../../../../components/DirektoriCard";
import { IPlace, IPlaceCategory } from "../../../../interfaces";
import { PLACE_CATEGORY_URL, PLACE_URL } from "../../../../constants";

const LihatSemua = () => {
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>([]);
  const [placeCategory, setPlaceCategory] = useState<IPlaceCategory | null>();
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    const placeData = await getAllPlacesByCategoryId(id);
    const placeCategoryData = await getPlaceCategoryById(id);

    setAllPlaces(placeData.data);
    setPlaceCategory(placeCategoryData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container mx-auto mt-10 px-4">
        <header className="mb-20 flex items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {placeCategory?.category}
            </h1>
            <p className="deskripsi max-w-3xl break-words text-justify">
              {placeCategory?.description}
            </p>
          </div>
          <img
            src={
              placeCategory?.has_photo
                ? PLACE_CATEGORY_URL + placeCategory?.id
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
          {allPlaces?.map((place) => (
            <DirektoriCard
              key={place.id}
              id={place.id}
              has_photo={place.has_photo}
              name={place.name}
              price_min={place.price_min}
              price_max={place.price_max}
              address={place.address}
              rating={place.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LihatSemua;
