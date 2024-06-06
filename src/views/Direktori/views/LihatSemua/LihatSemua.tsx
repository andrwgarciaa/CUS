import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllPlacesByCategoryId,
  getPlaceCategoryById,
} from "../../../../utilities";
import DirektoriCard from "../../../../components/DirektoriCard";
import { IPlace, IPlaceCategory } from "../../../../interfaces";

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
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <header
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "75px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {placeCategory?.category}
          </h1>
          <p style={{ fontSize: "25px", color: "#666", marginBottom: "20px" }}>
            {placeCategory?.description}
          </p>
        </div>
        <img
          src="https://via.placeholder.com/150"
          alt="Direktori Tempat"
          style={{ width: "35%", height: "40%", objectFit: "cover" }}
        />
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
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
  );
};

export default LihatSemua;
