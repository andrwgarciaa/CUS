import KomunitasCard from "./KomunitasCard";
import { ICommunityActivity } from "../interfaces";
import { Link } from "react-router-dom";

const KomunitasSection = ({
  title,
  data,
}: {
  title: string;
  data: ICommunityActivity[] | null;
}) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          to={`/komunitas-aktivitas/lihat-semua/${
            title.split(" ")[1].toLowerCase() === "komunitas" ? 2 : 3
          }`}
          className="underline"
        >
          Lihat semua
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 hide-scrollbar">
        {data?.map((item) => (
          <KomunitasCard key={item?.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default KomunitasSection;
