import DirektoriKomuCard from "./Components/DirektoriKomuCard";
import { CardKomuProps } from "./interfaces";

const Komunitas = () => {
  return (
    <div className = "container mx-auto mt-10 px-4">
      <header className="mb-8 flex items-center">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">Komunitas</h1>
                        <p className="deskripsi max-w-xl break-words">
                            Lorem ipsum dolor sit amet consectetur. Volutpat aenean pretium quam orci id semper viverra. 
                            Laoreet porta ut porta pulvinar. Volutpat morbi tortor neque pellentesque quis. Vel purus bibendum purus feugiat eu.
                        </p>
                    </div>
                    <div className="w-48 h-48 bg-gray-500 ml-8"></div>
            </header>
            <SectionKomu title="Cari Komunitas"/>
            <SectionKomu title="Cari Aktivitas"/>
    </div>
    
  )
}

interface SectionProps{
  title: string;
}


const SectionKomu: React.FC<SectionProps> = ({title}) => {
  const sampleCardData: CardKomuProps = {
    image: "https://via.placeholder.com/150",
    title: "Wibu Sehat bersama",
    quote: "Bersatu kita runtuh, bersama kita wibu",
    category:"18+",
    member: 1000000,
    tags: ["Game", "Film", "HD", "Wibu"],
  };

  return(
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

export default Komunitas
