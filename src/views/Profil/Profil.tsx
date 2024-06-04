import { useState, useEffect, useContext } from "react";
import { IUser } from "../../interfaces";
import { SessionContext } from "../../contexts/SessionContext";
import { Link, useParams } from "react-router-dom";
import { getUserByName } from "./utilities";
import { IProfil, IStatistik, IStatistikType } from "./interfaces";
import StatistikCard from "./components/StatistikCard";

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

  const fetchUser = async () => {
    if (name) {
      const data = await getUserByName(name);
      setUser(data);
      setStatistik(data.statistik);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-[90vh]">
      <div className="flex flex-col justify-center items-start w-3/5 gap-16">
        <div className="flex justify-center items-center gap-16">
          <img
            className="w-1/4 h-1/4 border rounded-full"
            src={user?.avatar_url}
            alt={user?.name}
          />
          <div className="flex flex-col w-full">
            <h1 className="text-4xl font-bold mb-10">
              {user?.name} | {user?.age ? user.age : "?"}
            </h1>
            {user?.description ? (
              <blockquote className="text-xl italic font-medium text-left">
                <p className="max-w-full">"{user.description}"</p>
              </blockquote>
            ) : (
              <p>User terlalu malas untuk membuat deskripsi</p>
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
          <h2 className="text-3xl font-bold">Statistik</h2>
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
