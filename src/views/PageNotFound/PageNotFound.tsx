import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-[90vh]">
      <div>
        <h1 className="text-6xl">Error: 404</h1>
        <p className="text-2xl">
          Halaman tidak ditemukan. Kembali ke{" "}
          <Link to={"/"} className="text-blue-500 underline">
            halaman utama
          </Link>
          .
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default PageNotFound;
