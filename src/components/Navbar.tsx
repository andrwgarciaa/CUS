import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces";
import { SessionContext } from "../contexts/SessionContext";

const Navbar = () => {
  const navigation = useNavigate();
  const session = useContext(SessionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const [profileClicked, setProfileClicked] = useState(false);

  const handleSignOut = () => {
    session.removeSession();
    setIsLoggedIn(session.isLoggedIn);
    setProfileClicked(false);
    navigation("/signin");
  };

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn);
    if (session.isLoggedIn) {
      setUser(session.user);
    }
  }, [session.isLoggedIn]);

  return (
    <nav className="bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <Link to={"/"}>CUS</Link>

      <ul className="hidden lg:flex items-center gap-8">
        <Link to={"/direktori"}>Direktori</Link>
        <li>Komunitas & Aktivitas</li>
        <Link to={"/forum"}>Forum</Link>
        {isLoggedIn ? (
          // <Link to={"/profil"}>
          <img
            className="w-12 h-12 rounded-full hover:cursor-pointer"
            src={user?.avatar_url}
            alt={user?.name}
            onClick={() => setProfileClicked(!profileClicked)}
          />
        ) : (
          // </Link>
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
          <Link to={"/profil"}>Profil</Link>
          <span className="hover:cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </span>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
