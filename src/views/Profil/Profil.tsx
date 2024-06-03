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
      <img src={user?.avatar_url} alt={user?.name} />
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default Profil;
