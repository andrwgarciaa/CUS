import DirektoriCard from "../../../components/DirektoriCard";
import {  IPlace } from "../../../interfaces";
import { ISectionProps } from "../interfaces";
import {Link} from 'react-router-dom'
const DirektoriSection: React.FC<ISectionProps> = ({
  categoryId,
  simplified,
}) => {
  const sampleCardData: IPlace = {
    id: 0,
    image: "https://via.placeholder.com/150",
    name: "Kayu - Kayu",
    price_min: 100000,
    price_max: 200000,
    address: "Jl. Jalur Sutera No. 28A, Alam Sutera, Sutera Barat",
    rating: 4.5,
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{simplified}</h1>
        <Link className="underline hover:underline" to= {`/direktori/lihat-semua/${categoryId}`}>
          Lihat semua
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
        {Array.from({ length: 10 }, (_, i) => (
          <DirektoriCard key={i} {...sampleCardData} />
        ))}
      </div>
    </section>
  );
};

export default DirektoriSection;
