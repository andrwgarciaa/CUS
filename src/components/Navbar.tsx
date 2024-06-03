import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <Link to={"/"}>CUS</Link>

      <ul className="hidden lg:flex items-center gap-8">
        <Link
          to={"/direktori"}>
            Direktori
        </Link>
        <Link to={"/komunitas"}>
          Komunitas & Aktivitas</Link>
        <li>Forum</li>
        <Link
          to={"/signin"}
          className="bg-cus-orange border border-none rounded-lg px-6 py-2"
        >
          Sign In
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
