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
      <img src={user?.avatar_url} alt={user?.name} />
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>upvote: {user?.votes.totalUpvote}</p>
      {/* age return 0 kalo user belom masukin tanggal lahir, contoh yang udah ada tanggal lahirnya di andrew886 */}
      <p>age: {user?.age ? user.age : "?"}</p>
    </div>
  );
};

export default Profil;
