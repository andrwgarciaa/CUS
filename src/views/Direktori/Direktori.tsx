import { useEffect, useState } from "react";
import { IPlaceCategory } from "../../interfaces";
import { getAllPlaceCategories } from "../../utilities";
import DirektoriSection from "./components/DirektoriSection";
import LoadingWithMessage from "../../components/LoadingWithMessage";

const Direktori = () => {
  const [allPlaces, setAllPlaces] = useState<IPlaceCategory[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getAllPlaceCategories().then((data) => {
      setAllPlaces(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto mt-10 px-4">
        <header className="mb-20 flex items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Direktori Tempat</h1>
            <p className="deskripsi max-w-3xl break-words text-justify">
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
        {!loading ? (
          <>
            {allPlaces?.map((place) => (
              <DirektoriSection
                key={place.id}
                categoryId={place.id}
                category={place.category}
                simplified={place.category_simplified}
              />
            ))}
          </>
        ) : (
          <LoadingWithMessage />
        )}
      </div>
    </div>
  );
};

export default Direktori;
