import DirektoriCard from "../../../components/DirektoriCard";
import { CardProps } from "../../../interfaces";
import { ISectionProps } from "../interfaces";

const DirektoriSection: React.FC<ISectionProps> = ({
  categoryId,
  category,
  simplified,
}) => {
  const sampleCardData: CardProps = {
    image: "https://via.placeholder.com/150",
    title: "Kayu - Kayu",
    price: "Rp 100.000 - 200.000/orang",
    address: "Jl. Jalur Sutera No. 28A, Alam Sutera, Sutera Barat",
    tags: ["asdhajshb", "Tag", "Tag", "+2"],
    rating: "4.5",
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{simplified}</h1>
        <a className="underline hover:underline" href="#">
          Lihat semua
        </a>
      </div>
      <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
        {Array.from({ length: 10 }, (_, i) => (
          <DirektoriCard key={i} {...sampleCardData} />
        ))}
      </div>
    </section>
  );
};

export default DirektoriSection;
