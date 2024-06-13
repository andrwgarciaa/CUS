import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { checkAdmin } from "../../utilities";
import { IUser } from "../../interfaces";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddDirektoriModal from "./components/AddDirektoriModal";
import AddDirektoriKomunitasAktivitas from "./components/AddDirektoriKomunitasAktivitas";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  const [openModal, setOpenModal] = useState<number>(-1);
  const session = useContext(SessionContext);

  const handleAddButton = (modal: number) => {
    if (openModal === modal) {
      setOpenModal(-1);
      return;
    }

    setOpenModal(modal);
  };

  useEffect(() => {
    setIsLoggedIn(session.isLoggedIn);
    if (session.isLoggedIn) {
      setUser(session.user);
      setIsAdmin(checkAdmin(session.user));
    }
  }, [session.isLoggedIn, session.user]);

  return (
    <>
      {isLoggedIn && isAdmin ? (
        <div className="p-4 relative w-screen h-[90vh]">
          <h1 className="text-3xl ">Halaman Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleAddButton(1);
              }}
              className="w-fit border rounded-lg p-2 mt-8 bg-white text-cus-blue border-cus-blue hover:bg-cus-blue hover:text-white"
            >
              Tambah data direktori
            </button>
            <button
              onClick={() => {
                handleAddButton(2);
              }}
              className="w-fit border rounded-lg p-2 mt-8 bg-white text-cus-blue border-cus-blue hover:bg-cus-blue hover:text-white"
            >
              Tambah data komunitas/aktivitas
            </button>
          </div>
          <div className="flex justify-center items-center">
            <AddDirektoriModal
              isOpen={openModal === 1}
              onClose={() => handleAddButton(1)}
            />
            <AddDirektoriKomunitasAktivitas
              isOpen={openModal === 2}
              onClose={() => handleAddButton(2)}
            />
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Admin;
