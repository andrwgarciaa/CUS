const Navbar = () => {
  return (
    <nav className="bg-cus-blue w-full h-[10vh] flex justify-between items-center px-8 text-white font-semibold">
      <p>CUS</p>
      <ul className="flex items-center gap-8">
        <li>Direktori</li>
        <li>Komunitas</li>
        <li>Forum</li>
        <li className="bg-cus-orange border border-none rounded-lg px-6 py-2">
          Login
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
