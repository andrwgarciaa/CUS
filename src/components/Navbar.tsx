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

  window.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).classList.contains("navbar"))
      setProfileClicked(false);
  });

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn);
    if (session.isLoggedIn) {
      setUser(session.user);
      setIsAdmin(checkAdmin(session.user));
    }
  }, [session.isLoggedIn, session.user]);

  return (
    <nav className="z-[1000000] bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <Link to={"/"} className="text-2xl font-bold">
        CUS
      </Link>

      <ul className="flex items-center gap-8">
        <Link to={"/direktori"}>Direktori</Link>
        <Link to={"/komunitas-aktivitas"}>Komunitas & Aktivitas</Link>
        <Link to={"/forum"}>Forum</Link>
        {isLoggedIn ? (
          <img
            className="navbar w-12 h-12 rounded-full hover:cursor-pointer object-cover"
            src={`${
              AVATAR_URL + (user?.has_photo ? user?.id : "blank")
            }?${Date.now()}`}
            alt={user?.name}
            onClick={() => setProfileClicked(!profileClicked)}
          />
        ) : (
          <Link
            to={"/signin"}
            className="navbar bg-cus-orange text-white border border-cus-orange hover:bg-cus-blue hover:text-cus-orange hover:border-cus-orange rounded-lg px-6 py-2"
          >
            Masuk
          </Link>
        )}
      </ul>
      {profileClicked ? (
        <div className="navbar z-[10000] bg-cus-blue w-48 h-max absolute top-24 right-0 flex flex-col items-center gap-4 p-4 rounded-lg shadow-lg transition-all">
          <Link to={`/profil/${user?.name}`} onClick={handleProfil}>
            Profil
          </Link>
          <Link to={"/arsip"}>Arsip</Link>
          {isAdmin ? <Link to={"/admin"}>Admin</Link> : null}
          <span className="hover:cursor-pointer" onClick={handleSignOut}>
            Keluar Akun
          </span>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
