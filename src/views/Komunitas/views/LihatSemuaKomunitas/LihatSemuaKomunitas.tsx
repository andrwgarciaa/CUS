import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KomunitasCard from "../../components/KomunitasCard";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";
import { ICommunityActivity } from "../../interfaces";
const LihatSemuaKomunitas = () => {
  const { id } = useParams<{ id: string }>();
  const [allPlaces, setAllPlaces] = useState<ICommunityActivity[] | null>([]);
  // const [placeCategory, setPlaceCategory] = useState<IPlaceCategory | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(false);
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
                {/* {placeCategory?.category} */}
              </h1>
              <p className="deskripsi max-w-3xl break-words text-justify">
                {/* {placeCategory?.description} */}
              </p>
            </div>
            {/* <img
              src={
                placeCategory?.has_photo
                  ? PLACE_CATEGORY_URL + placeCategory?.id
                  : PLACE_URL + "blank"
              }
              alt="Direktori Tempat"
              className="rounded-lg shadow-md"
              style={{ width: "35%", height: "40%", objectFit: "cover" }}
            /> */}
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "20px",
            }}
          >
            {allPlaces?.map((item) => (
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
