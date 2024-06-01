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
            <p className="deskripsi max-w-xl break-words">
              Lorem ipsum dolor sit amet consectetur. Volutpat aenean pretium
              quam orci id semper viverra. Laoreet porta ut porta pulvinar.
              Volutpat morbi tortor neque pellentesque quis. Vel purus bibendum
              purus feugiat eu.
            </p>
          </div>
          <div className="w-48 h-48 bg-gray-500 ml-8"></div>
        </header>
        {allPlaces?.map((place) => (
          <DirektoriSection
            key={place.id}
            categoryId={place.id}
            category={place.category}
            simplified={place.category_simplified}
          />
        ))}
      </div>
    </div>
  );
};

export default Direktori;
