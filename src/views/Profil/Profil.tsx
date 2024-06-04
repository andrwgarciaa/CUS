import { useState, useEffect, useContext } from "react";
import { IUser } from "../../interfaces";
import { SessionContext } from "../../contexts/SessionContext";

const Profil = () => {
  const session = useContext(SessionContext);
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    setUser(session.user);
  }, [session.isLoggedIn]);

  return (
    <div>
      <div className="p-4">
        <img className="w-30 h-30" src={user?.avatar_url} alt={user?.name} />
      </div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default Profil;
