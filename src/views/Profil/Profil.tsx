import { useState, useEffect, useContext } from "react";
import { IUser } from "../../interfaces";
import { SessionContext } from "../../contexts/SessionContext";
import { useParams } from "react-router-dom";
import { getUserByName } from "./utilities";
import { IProfil } from "./interfaces";

const Profil = () => {
  const { name } = useParams();
  const session = useContext(SessionContext);
  const [user, setUser] = useState<IProfil | null>();

  // note dari endru, boleh diapus
  // buat yang sekarang cuma ini data yang bisa diambil. komunitas/aktivitas nunggu page dari AW.
  // show forum yang udah dibuat nanti nunggu komunitas aja, atau siangan gw bikinin kalo gabut
  // ini gw naikin biar lu bisa start kerja dulu

  const fetchUser = async () => {
    if (name) {
      const data = await getUserByName(name);
      setUser(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex pt-20 pb-10 px-60">
        <img style={{ width: "20%", objectFit: "cover", borderRadius: "50%" }} src={user?.avatar_url} alt={user?.name} />
        <div className="px-40">
          <h1 className="text-4xl font-bold mb-10">{user?.name} | {user?.age ? user.age : "?"}</h1>
          <p>User terlalu malas untuk membuat deskripsi</p>
        </div>
      </div>
      {/* <p>{user?.email}</p> */}
      <p>upvote: {user?.votes.totalUpvote}</p>
      {/* age return 0 kalo user belom masukin tanggal lahir, contoh yang udah ada tanggal lahirnya di andrew886 */}
    </div>
  );
};

export default Profil;
