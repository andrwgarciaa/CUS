import DirektoriCard from "../../components/DirektoriCard";
import { CardProps } from "../../interfaces";
import "../Direktori/interfaces/index.ts"

const Direktori = () => {
    return (
        <div className="">
            <div className = "container mx-auto mt-12 px-4">
            <header className="mb-8 flex items-start">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-4">Direktori Tempat</h1>
                        <p className="deskripsi max-w-2xl break-words text-justify">
                            Menjelajah ke tempat-tempat seperti restoran, kafe, mal, supermarket, taman, hingga bengkel memberikan pengalaman yang beragam, 
                            seperti menikmati kuliner lezat hingga berbelanja semua kebutuhan anda, bersantai di alam, memperbaiki kendaraan, dan menikmati kopi 
                            di suasana yang nyaman.
                        </p>
                    </div>
                    <img src="https://images.pexels.com/photos/2962035/pexels-photo-2962035.jpeg" alt="Direktori Tempat"  style={{ width: "35%", height: "40%", objectFit: "cover" }}/>
            </header>
                <Section title="Restoran-restoran"/>
                <Section title="Tempat nongkrong asik"/>
                <Section title="Belanja seru"/>
                <Section title="Supermarket"/>
                <Section title="Cuci mobil"/>
                <Section title="Bengkel"/>
                <Section title="Taman"/>
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
        rating: '4.5',
    };

    return(
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <a className="underline hover:underline" href="#">
                    Lihat semua
                </a>
            </div>
            <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400">
                {Array.from({ length: 10 }, (_, i) => (
                <DirektoriCard key={i} {...sampleCardData} />
        ))}
            </div>
        </section>
    );
};

export default Direktori;
