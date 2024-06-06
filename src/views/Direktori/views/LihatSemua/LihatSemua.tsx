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
    <div>
      <div className="container mx-auto mt-10 px-4">
        <header className="mb-20 flex items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{placeCategory?.category}</h1>
            <p className="deskripsi max-w-3xl break-words text-justify">
              Menjelajah ke tempat-tempat seperti restoran, kafe, mal,
              supermarket, taman, hingga bengkel memberikan pengalaman yang
              beragam, seperti menikmati kuliner lezat hingga berbelanja semua
              kebutuhan anda, bersantai di alam, memperbaiki kendaraan, dan
              menikmati kopi di suasana yang nyaman.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Direktori Tempat"
            style={{ width: "35%", height: "40%", objectFit: "cover" }}
          />
        </header>
      <div
        style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px"}}>
        {allPlaces?.map((place) => (
          <DirektoriCard
            key={place.id}
            id={place.id}
            image={place.image}
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
