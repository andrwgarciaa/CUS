import { useEffect, useRef, useState } from "react";
import { IHomeProps } from "../interfaces";
import { getAllPlaceCategories } from "../../Direktori/utilities";
import { ICategory } from "../../../interfaces";

const MapFilter = (props: IHomeProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [placeCategories, setPlaceCategories] = useState<ICategory[] | null>(
    []
  );

  const getFilter = async () => {
    const data = await getAllPlaceCategories();
    setPlaceCategories(data.data);
  };

  const handleSelectCategory = (id: number) => {
    if (id === selectedFilter) {
      props.setSelectedCategory(0);
      setSelectedFilter(0);
      return;
    }
    props.setSelectedCategory(id);
    setSelectedFilter(id);
  };

  const handleArrow = (direction: string) => () => {
    if (direction === "LEFT") {
      filterRef.current!.scrollLeft -= 100;
    } else {
      filterRef.current!.scrollLeft += 100;
    }
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <div className="w-2/3 flex gap-4 scrollbar-none">
      <span
        onClick={handleArrow("LEFT")}
        className="py-3 px-5 rounded-full bg-white hover:cursor-pointer font-bold"
      >
        &lt;
      </span>
      <div
        ref={filterRef}
        className="flex w-3/4 items-center gap-2 overflow-x-scroll"
      >
        {placeCategories?.map((place) => (
          <div
            key={place.id}
            className={`px-5 py-3 rounded-2xl shadow-lg hover:cursor-pointer transition-all ${
              selectedFilter === place.id
                ? "bg-cus-blue text-white"
                : "bg-white"
            }`}
            onClick={() => handleSelectCategory(place.id)}
          >
            <p className="w-max">{place.category}</p>
          </div>
        ))}
      </div>
      <span
        onClick={handleArrow("RIGHT")}
        className="py-3 px-5 rounded-full bg-white hover:cursor-pointer font-bold"
      >
        &gt;
      </span>
    </div>
  );
};

export default MapFilter;
