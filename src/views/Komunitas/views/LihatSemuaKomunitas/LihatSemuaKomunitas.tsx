import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import KomunitasCard from "../../components/KomunitasCard";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";
import { ICommunityActivity } from "../../interfaces";
import {
  getCommunityActivityByTypeId,
  getCommunityActivityCategoryById,
} from "../../utilities";
import { ICategory } from "../../../../interfaces";

const LihatSemuaKomunitas = () => {
  const { id } = useParams<{ id: string }>();
  const [allCommunityActivity, setAllCommunityActivity] = useState<
    ICommunityActivity[] | null
  >([]);
  const [communityActivityType, setCommunityActivityType] =
    useState<ICategory | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(false);
    const data = await getCommunityActivityByTypeId(id);
    const categoryData = await getCommunityActivityCategoryById(id);
    if (data.data) setAllCommunityActivity(data.data);
    if (categoryData.data) setCommunityActivityType(categoryData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="container mx-auto mt-10 px-4">
          <div className="relative w-full h-[512px] overflow-hidden">
            <img
              src={id === "2" ? "/komunitas.webp" : "/aktivitas.jpg"}
              alt="Direktori Tempat"
              className="top-96 w-full h-full object-cover"
            />
          </div>
          <header className="mb-20 flex items-center mt-9">
            <div className="flex-1">
              <h1 className="text-6xl font-bold mb-2 text-left">
                {id === "2" ? "Komunitas" : "Aktivitas"}
              </h1>
              <p className="text-xl deskripsi max-w-3xl break-words">
                {id === "2"
                  ? "Tempat di mana orang-orang dengan minat yang sama berkumpul dan bersenang-senang bersama. Bergabung dengan komunitas berarti Anda bisa ikut dalam berbagai kegiatan seru, proyek kolaboratif, dan merasakan kebersamaan yang hangat."
                  : "Cara seru untuk mengisi waktu dan mencoba hal-hal baru. Dari olahraga, seni, memasak, hingga jalan-jalan, ada banyak aktivitas yang bisa kamu pilih sesuai minatmu."}
              </p>
            </div>
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "20px",
            }}
          >
            {allCommunityActivity?.map((item) => (
              <KomunitasCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </div>
  );
};

export default LihatSemuaKomunitas;
