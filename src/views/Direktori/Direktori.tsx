import { useEffect, useState } from "react";
import { IPlaceCategory } from "../../interfaces";
import { getAllPlaceCategories } from "../../utilities";
import DirektoriSection from "./components/DirektoriSection";

const Direktori = () => {
  const [allPlaces, setAllPlaces] = useState<IPlaceCategory[] | null>([]);

  useEffect(() => {
    getAllPlaceCategories().then((data) => {
      setAllPlaces(data.data);
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto mt-10 px-4">
        <header className="mb-8 flex items-center">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Direktori Tempat</h1>
            <p className="deskripsi max-w-2xl break-words text-justify">
              Menjelajah ke tempat-tempat seperti restoran, kafe, mal,
              supermarket, taman, hingga bengkel memberikan pengalaman yang
              beragam, seperti menikmati kuliner lezat hingga berbelanja semua
              kebutuhan anda, bersantai di alam, memperbaiki kendaraan, dan
              menikmati kopi di suasana yang nyaman.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/2962035/pexels-photo-2962035.jpeg"
            alt="Direktori Tempat"
            style={{ width: "35%", height: "40%", objectFit: "cover" }}
          />
        </header>
        {allPlaces?.map((place) => (
          <DirektoriSection
            key={place.id}
            category={place.category}
            simplified={place.category_simplified}
          />
        ))}
      </div>
    </div>
  );
};

export default Direktori;
