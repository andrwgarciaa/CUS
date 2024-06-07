import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import { SessionContext } from "../contexts/SessionContext";
import { AVATAR_URL } from "../constants";
import { checkAdmin } from "../utilities";

const Navbar = () => {
  const navigation = useNavigate();
  const session = useContext(SessionContext);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const [profileClicked, setProfileClicked] = useState(false);

  const handleSignOut = () => {
    session.removeSession();
    setIsLoggedIn(session.isLoggedIn);
    setProfileClicked(false);
    navigation("/signin");
  };

  const handleProfil = () => {
    // force refresh to own profile
    if (
      location.pathname.includes(`/profil/`) &&
      !(location.pathname === `/profil/${session.user?.name}`)
    ) {
      window.location.href = `/profil/${user?.name}`;
    }
  };

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn);
    if (session.isLoggedIn) {
      setUser(session.user);
      setIsAdmin(checkAdmin(session.user));
    }
  }, [session.isLoggedIn, session.user]);

  return (
    <nav className="z-[1000000] bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <Link to={"/"}>CUS</Link>

      <ul className="hidden lg:flex items-center gap-8">
        <Link to={"/direktori"}>Direktori</Link>
        <Link to={"/komunitas&aktivitas"}>Komunitas & Aktivitas</Link>
        <Link to={"/forum"}>Forum</Link>
        {isLoggedIn ? (
          <img
            className="w-12 h-12 rounded-full hover:cursor-pointer object-cover"
            src={AVATAR_URL + (user?.has_photo ? user?.id : "blank")}
            alt={user?.name}
            onClick={() => setProfileClicked(!profileClicked)}
          />
        ) : (
          <Link
            to={"/signin"}
            className="bg-cus-orange text-white border border-cus-orange hover:bg-cus-blue hover:text-cus-orange hover:border-cus-orange rounded-lg px-6 py-2"
          >
            Sign In
          </Link>
        )}
      </ul>
      {profileClicked ? (
        <div className="z-[10000] bg-cus-blue w-48 h-max absolute top-24 right-0 flex flex-col items-center gap-4 p-4 rounded-lg shadow-lg transition-all">
          <Link to={`/profil/${user?.name}`} onClick={handleProfil}>
            Profil
          </Link>
          {isAdmin ? <Link to={"/admin"}>Admin</Link> : null}
          <span className="hover:cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </span>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
