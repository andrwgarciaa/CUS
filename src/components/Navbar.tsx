import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <p>CUS</p>
      <ul className="flex items-center gap-8">
        <Link to={"/direktori"}>Direktori</Link>
        <Link to={"/komunitas"}>Komunitas</Link>
        <Link to={"/forum"}>Forum</Link>
        <Link
          to={"/login"}
          className="bg-cus-orange border border-none rounded-lg px-6 py-2"
        >
          Login
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
