import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../../../contexts/SessionContext";
import { IProfil } from "../../interfaces";
import { getUserByName } from "../../utilities";
import PageNotFound from "../../../PageNotFound/PageNotFound";
import { updateProfil, uploadProfilePhoto } from "./utilities";
import { AVATAR_URL } from "../../../../constants";
import { IUser } from "../../../../interfaces";

const EditProfil = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const session = useContext(SessionContext);
  const [user, setUser] = useState<IProfil | null>();
  const [image, setImage] = useState<File | null>(null);
  const [formName, setFormName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [date, setDate] = useState<Date>();
  const [gender, setGender] = useState(0);
  const [openGender, setOpenGender] = useState(false);
  const [description, setDescription] = useState(user?.description);

  const genderList = ["Laki-laki", "Perempuan", "Lainnya"];

  const fetchUser = async () => {
    if (name) {
      const data = await getUserByName(name);
      setUser(data);
      if (data.gender_id) setGender(Number(data?.gender_id) - 1);
      if (data.date_of_birth) {
        const date = new Date(data.date_of_birth);
        setDate(date);
      }
      console.log(data);
    }
  };

  const handleEditProfil = async (e: React.FormEvent) => {
    e.preventDefault();
    let newPhoto;
    if (user) {
      if (image) {
        newPhoto = await uploadProfilePhoto(image, user.id);
        if (!newPhoto) {
          alert("Gagal memperbarui foto profil.");
          return;
        }
      }

      const dto: IUser = {
        id: user.id,
        name: formName ?? user.name,
        email: email ?? user.email,
        date_of_birth: date ?? user.date_of_birth,
        gender_id: gender + 1,
        description: description ?? user.description,
        updated_at: new Date(),
        has_photo: newPhoto ? true : user.has_photo,
      };

      const data = await updateProfil(dto);

      if (data.status === 200) {
        alert("Profil berhasil diubah!");
        session.setSession(false, data.data);
        navigate("/profil/" + data.data.name);
      } else {
        alert("Profil gagal diubah.");
      }
    }
  };

  window.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).classList.contains("option"))
      setOpenGender(false);
  });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {session && session.user?.id === user?.id ? (
        <div className="w-screen h-[90vh] flex justify-center items-center">
          <form
            className="flex flex-col gap-4 w-1/3 top-1/2 left-1/2 bg-white border rounded-xl p-12"
            onSubmit={handleEditProfil}
          >
            <h1 className="text-3xl text-center font-semibold">Edit profil</h1>
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                id="photo"
                accept="image/*"
                className="hidden"
                onInput={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setImage(file);
                  }
                }}
              />
              <label
                htmlFor="photo"
                className="relative w-56 h-56 rounded-full hover:cursor-pointer"
              >
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : AVATAR_URL + (user?.has_photo ? user?.id : "blank")
                  }
                  alt="profile photo"
                  className="rounded-full object-cover w-56 h-56"
                />
                <p className="absolute bottom-4 right-4 bg-white border border-cus-blue rounded-full w-8 h-8 text-cus-blue text-lg flex justify-center items-center -scale-x-100 hover:cursor-pointer">
                  &#9998;
                </p>
              </label>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    defaultValue={user?.name}
                    className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setFormName((e.target as HTMLInputElement).value)
                    }
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Username
                  </label>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    defaultValue={user?.email}
                    className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setEmail((e.target as HTMLInputElement).value)
                    }
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    placeholder=" "
                    // defaultValue={user?.date_of_birth?.toDateString()}
                    className="p-3 pb-2 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setDate(new Date((e.target as HTMLInputElement).value))
                    }
                  />
                  <label
                    htmlFor="date"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Tanggal Lahir (dd/mm/yyyy)
                  </label>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative option">
                  <input
                    id="gender"
                    placeholder=" "
                    value={genderList[gender]}
                    readOnly
                    onFocus={() => setOpenGender(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Tab") {
                        setOpenGender(false);
                      }
                    }}
                    className="hover:cursor-default p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <label
                    htmlFor="gender"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Jenis Kelamin
                  </label>
                  {openGender ? (
                    <div className="option border border-t-0 rounded-lg mt-1">
                      {genderList.map((gender, i) => (
                        <p
                          key={gender}
                          className="hover:cursor-pointer rounded-lg w-full p-2 bg-white hover:bg-gray-100"
                          onClick={() => {
                            setGender(i);
                            setOpenGender(false);
                          }}
                        >
                          {gender}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <textarea
                    id="description"
                    placeholder=" "
                    defaultValue={user?.description}
                    rows={3}
                    className="resize-none p-3 pb-2 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setDescription((e.target as HTMLInputElement).value)
                    }
                  />
                  <label
                    htmlFor="date"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Deskripsi / Bio
                  </label>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="bg-white text-cus-orange rounded-lg p-2 hover:cursor-pointer hover:bg-cus-orange hover:text-white border border-cus-orange"
              value="Simpan"
            />
          </form>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default EditProfil;
