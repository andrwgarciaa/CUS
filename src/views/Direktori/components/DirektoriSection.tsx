import { useEffect, useState } from "react";
import DirektoriCard from "../../../components/DirektoriCard";
import { IPlace } from "../../../interfaces";
import { getAllPlacesByCategoryId } from "../../Direktori/utilities";
import { ISectionProps } from "../interfaces";
import { Link } from "react-router-dom";
const DirektoriSection: React.FC<ISectionProps> = ({
  categoryId,
  simplified,
}) => {
  const [data, setData] = useState<IPlace[] | null>([]);

  const fetchData = async () => {
    const placeData = await getAllPlacesByCategoryId(categoryId.toString());
    setData(placeData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{simplified}</h1>
        <Link
          className="underline hover:underline"
          to={`/direktori/lihat-semua/${categoryId}`}
        >
          Lihat semua
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
        {data?.map((place) => (
          <DirektoriCard
            key={place.id}
            id={place.id}
            name={place.name}
            price_min={place.price_min}
            price_max={place.price_max}
            has_photo={place.has_photo}
            address={place.address}
            rating={place.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default DirektoriSection;
