import DirektoriCard from "../../components/DirektoriCard";
import { CardProps } from "../../interfaces";

const Direktori = () => {
    return (
        <div>
            <div className = "container mx-auto mt-10 px-4">
            <header className="mb-8 flex items-center">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">Direktori Tempat</h1>
                        <p className="deskripsi max-w-xl break-words">
                            Lorem ipsum dolor sit amet consectetur. Volutpat aenean pretium quam orci id semper viverra. 
                            Laoreet porta ut porta pulvinar. Volutpat morbi tortor neque pellentesque quis. Vel purus bibendum purus feugiat eu.
                        </p>
                    </div>
                    <div className="w-48 h-48 bg-gray-500 ml-8"></div>
            </header>
                <Section title="Restoran-restoran"/>
                <Section title="Tempat nongkrong asik"/>
                <Section title="Cuci mobil"/>
            </div>
            
        </div>
    );
};

interface SectionProps{
    title: string;
}

const Section: React.FC<SectionProps> = ({title}) => {
    const sampleCardData: CardProps = {
        image: 'https://via.placeholder.com/150',
        title: 'Kayu - Kayu',
        price: 'Rp 100.000 - 200.000/orang',
        address: 'Jl. Jalur Sutera No. 28A, Alam Sutera, Sutera Barat',
        tags: ['asdhajshb', 'Tag', 'Tag', '+2'],
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
                <DirektoriCard key={i} {...sampleCardData} />
        ))}
            </div>
        </section>
    );
};

export default Direktori;