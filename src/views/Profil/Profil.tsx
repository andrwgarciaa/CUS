import { useState, useContext, useLayoutEffect } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { Link, useParams } from "react-router-dom";
import { getUserByName } from "./utilities";
import { IProfil, IStatistikType } from "./interfaces";
import StatistikCard from "./components/StatistikCard";
import { AVATAR_URL } from "../../constants";

const Profil = () => {
  const { name } = useParams();
  const session = useContext(SessionContext);
  const [statistik, setStatistik] = useState<IStatistikType>({
    totalPost: 0,
    totalComment: 0,
    totalUpvote: 0,
    totalDownvote: 0,
    totalActivitiesCreated: 0,
    totalActivitiesJoined: 0,
  });
  const [user, setUser] = useState<IProfil | null>();
  const [, setLoading] = useState(true);

  const fetchUser = async () => {
    if (name) {
      const data = await getUserByName(name);
      setUser(data);
      setStatistik(data.statistik);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchUser();
  }, [session.user]);

  return (
    <div className="flex justify-center items-center w-screen h-[90vh]">
      <div className="flex flex-col justify-center items-start w-3/5 gap-16">
        <div className="flex justify-center items-center gap-16">
          <img
            className="w-56 h-56 border rounded-full object-cover"
            src={`${
              AVATAR_URL + (user?.has_photo ? user?.id : "blank")
            }?${Date.now()}`}
            alt={user?.name}
            onLoad={() => setLoading(false)}
          />

          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold">
              {user?.name} &#10072;{" "}
              {user?.gender_id === 1 ? (
                <span className="text-blue-500">&#9794;</span>
              ) : user?.gender_id === 2 ? (
                <span className="text-pink-500">&#9792;</span>
              ) : (
                <span>?</span>
              )}
            </h1>
            <h2 className="mb-10">
              &#127874;{" "}
              {user?.date_of_birth?.toString() ??
                "Tanggal lahir tidak diketahui"}
            </h2>
            {user?.description ? (
              <blockquote className="text-xl italic font-medium text-left">
                <p className="max-w-full">"{user.description}"</p>
              </blockquote>
            ) : (
              <p>Pengguna terlalu malas untuk membuat deskripsi</p>
            )}
            {session.isLoggedIn && session.user?.id === user?.id && (
              <Link
                to={`/profil/${user?.name}/edit`}
                className="w-fit border rounded-lg p-2 mt-8 bg-white text-cus-orange border-cus-orange hover:bg-cus-orange hover:text-white"
              >
                Edit Profil
              </Link>
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-bold">Statistik pengguna</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {Array.from(Object.keys(statistik)).map((key) => (
              <StatistikCard
                key={key}
                title={key}
                value={statistik[key as keyof IStatistikType] || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
