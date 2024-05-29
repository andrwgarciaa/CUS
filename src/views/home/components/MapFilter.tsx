import { useEffect, useRef, useState } from "react";
import { getPlaceCategories } from "../utilities";
import { IHomeProps } from "../interfaces";

const MapFilter = (props: IHomeProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [placeCategories, setPlaceCategories] = useState<any[] | null>([]);

  const getFilter = async () => {
    const data = await getPlaceCategories();
    setPlaceCategories(data.data);
  };

  const handleSelectCategory = (id: number) => {
    props.setSelectedCategory(id);
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
    <div className="w-2/3 flex gap-4">
      <span
        onClick={handleArrow("LEFT")}
        className="py-3 px-5 rounded-full bg-white hover:cursor-pointer"
      >
        &lt;
      </span>
      <div ref={filterRef} className="flex items-center gap-2 overflow-x-auto">
        {placeCategories?.map((place) => (
          <span
            key={place.category}
            className="px-5 py-3 bg-white rounded-2xl shadow-lg hover:cursor-pointer transition-all"
            onClick={() => handleSelectCategory(place.id)}
          >
            {place.category}
          </span>
        ))}
      </div>
      <span
        onClick={handleArrow("RIGHT")}
        className="py-3 px-5 rounded-full bg-white hover:cursor-pointer"
      >
        &gt;
      </span>
    </div>
  );
};

export default MapFilter;
