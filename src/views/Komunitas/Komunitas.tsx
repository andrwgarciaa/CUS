import DirektoriKomuCard from "./Components/DirektoriKomuCard";
import { CardKomuProps } from "./interfaces";

const Komunitas = () => {
  return (
    <div className="container mx-auto mt-10 px-4">
      <header className="mb-20 flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Komunitas</h1>
          <p className="deskripsi max-w-3xl break-words text-justify">
            Tidak ada yang lebih kuat dari komunitas yang solid. Bersama-sama,
            kita bisa mencapai lebih banyak, saling mendukung, dan tumbuh
            bersama. Mari kita terlibat dalam berbagai aktivitas yang membangun,
            menginspirasi, dan memberikan dampak positif. Bersama, kita bisa
            membuat perbedaan!
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/2962035/pexels-photo-2962035.jpeg"
          alt="Direktori Tempat"
          style={{ width: "35%", height: "40%", objectFit: "cover" }}
        />
      </header>
      <SectionKomu title="Cari Komunitas" />
      <SectionKomu title="Cari Aktivitas" />
    </div>
  );
};

interface SectionProps {
  title: string;
}

const SectionKomu: React.FC<SectionProps> = ({ title }) => {
  const sampleCardData: CardKomuProps = {
    image: "https://via.placeholder.com/150",
    title: "Wibu Sehat bersama",
    quote: "Bersatu kita runtuh, bersama kita wibu",
    category: "18+",
    member: 1000000,
    rating: 4.0,
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <a className="underline hover:underline" href="#">
          Lihat semua
        </a>
      </div>
      <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
        {Array.from({ length: 10 }, (_, i) => (
          <DirektoriKomuCard key={i} {...sampleCardData} />
        ))}
      </div>
    </section>
  );
};

export default Komunitas;
