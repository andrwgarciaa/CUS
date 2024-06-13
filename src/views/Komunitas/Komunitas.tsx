import { useState, useEffect } from "react";
import KomunitasSection from "./components/KomunitasSection";
import { ICommunityActivity } from "./interfaces";
import { getAllCommunityActivity } from "./utilities";
import LoadingWithMessage from "../../components/LoadingWithMessage";

const Komunitas = () => {
  const [komunitas, setKomunitas] = useState<ICommunityActivity[] | null>([]);
  const [aktivitas, setAktivitas] = useState<ICommunityActivity[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const data = await getAllCommunityActivity();
    if (data) {
      setKomunitas(data.komunitas.data);
      setAktivitas(data.aktivitas.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <header className="mb-20 flex items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Komunitas & Aktivitas</h1>
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
      {!loading ? (
        <>
          <KomunitasSection title="Cari Komunitas" data={komunitas} />
          <KomunitasSection title="Cari Aktivitas" data={aktivitas} />
        </>
      ) : (
        <LoadingWithMessage />
      )}
    </div>
  );
};

export default Komunitas;
