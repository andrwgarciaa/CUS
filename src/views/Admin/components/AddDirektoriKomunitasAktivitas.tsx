import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { getAllCommunityActivityCategories } from "../../Komunitas/utilities";
import { ICategory } from "../../../interfaces";
import { addCommunityActivity } from "../utilities";
import { ICommunityActivity } from "../../Komunitas/interfaces";
import { SessionContext } from "../../../contexts/SessionContext";

const AddDirektoriKomunitasAktivitas = (props: any) => {
  const session = useContext(SessionContext);
  const [name, setName] = useState<string>("");
  const [motto, setMotto] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(2);
  const [communityCategoryList, setCommunityCategoryList] = useState<
    { label: string; value: number }[]
  >([{ label: "Pilih kategori...", value: 0 }]);
  const [activityCategoryList, setActivityCategoryList] = useState<
    { label: string; value: number }[]
  >([{ label: "Pilih kategori...", value: 0 }]);
  const [type, setType] = useState<number>(2);
  const [images, setImages] = useState<FileList | undefined>();

  const fetchCategory = async () => {
    const data = await getAllCommunityActivityCategories();
    if (data) {
      setCommunityCategoryList([
        { label: "Pilih kategori...", value: 0 },
        ...(data.komunitas.data?.map((category: ICategory) => ({
          label: category.category,
          value: category.id,
        })) || []),
      ]);
      setActivityCategoryList([
        { label: "Pilih kategori...", value: 0 },
        ...(data.aktivitas.data?.map((category: ICategory) => ({
          label: category.category,
          value: category.id,
        })) || []),
      ]);
    }
  };

  const handleAddCommunityActivity = async (e: any) => {
    if (!session.isLoggedIn && !session.user?.isAdmin) {
      alert("Anda tidak memiliki akses");
      return;
    }

    if (!name || !category || !type) {
      alert("Data tidak boleh kosong");
      return;
    }

    e.preventDefault();
    const dto: ICommunityActivity = {
      name,
      motto,
      description,
      category_id: category,
      type_id: type,
      member_count: memberCount ?? null,
      pos_x: posX,
      pos_y: posY,
      has_photo: images && images.length > 0,
    };

    const data = await addCommunityActivity(dto, images!);

    if (data.status === 201) {
      setName("");
      setMotto("");
      setDescription("");
      setMemberCount(0);
      setCategory(0);
      setType(2);
      setImages(undefined);
      (document.querySelector("#formCommunity") as HTMLFormElement)?.reset();
      props.onClose();

      alert("Data berhasil ditambahkan");
    } else alert("Data gagal ditambahkan");
  };

  window.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).classList.contains("option"))
      setOpenCategory(false);
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <h2 className="m-2 text-4xl font-bold">
        Tambah Data Komunitas/Aktivitas
      </h2>
      <form
        id="formCommunity"
        onSubmit={handleAddCommunityActivity}
        className="flex flex-col gap-4 w-3/4 overflow-auto p-4"
      >
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="name"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Nama {type === 2 ? "Komunitas" : "Aktivitas"}
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    defaultChecked
                    type="radio"
                    id="community"
                    name="communityActivity"
                    className="peer"
                    onChange={() => setType(2)}
                  />
                  <label
                    htmlFor="community"
                    className="ml-2 text-sm text-gray-500"
                  >
                    Community
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="activity"
                    name="communityActivity"
                    className="peer"
                    onChange={() => setType(3)}
                  />
                  <label
                    htmlFor="activity"
                    className="ml-2 text-sm text-gray-500"
                  >
                    Activity
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="text"
                id="motto"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setMotto((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="motto"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Motto
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <textarea
                rows={3}
                id="description"
                placeholder=" "
                className="p-3 peer block w-full resize-none rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setDescription((e.target as HTMLInputElement).value)
                }
              />
              <label
                htmlFor="description"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Description
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full flex gap-2">
          <div>
            <div className="relative">
              <input
                type="number"
                id="count"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setMemberCount(Number((e.target as HTMLInputElement).value))
                }
              />
              <label
                htmlFor="count"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                {type === 2 ? "Member" : "Available slot"} count
              </label>
            </div>
          </div>
          <div className="col-span-4">
            <div className="relative option">
              <input
                id="category"
                placeholder=" "
                value={
                  type === 2
                    ? communityCategoryList.filter(
                        (x) => x.value === category
                      )[0].label
                    : activityCategoryList.filter(
                        (x) => x.value === category
                      )[0].label
                }
                readOnly
                onFocus={() => setOpenCategory(true)}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    setOpenCategory(false);
                  }
                }}
                className="option hover:cursor-default p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              />
              <label
                htmlFor="category"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Kategori
              </label>
              {openCategory ? (
                <div className="option border border-t-0 rounded-lg mt-1 max-h-36 overflow-auto">
                  {type === 2
                    ? communityCategoryList.map((category) => (
                        <p
                          key={category.value}
                          className="hover:cursor-pointer rounded-lg w-full p-2 bg-white hover:bg-gray-100"
                          onClick={() => {
                            setCategory(category.value);
                            setOpenCategory(false);
                          }}
                        >
                          {category.label}
                        </p>
                      ))
                    : activityCategoryList.map((category) => (
                        <p
                          key={category.value}
                          className="hover:cursor-pointer rounded-lg w-full p-2 bg-white hover:bg-gray-100"
                          onClick={() => {
                            setCategory(category.value);
                            setOpenCategory(false);
                          }}
                        >
                          {category.label}
                        </p>
                      ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mx-auto w-full flex gap-2">
          <div>
            <div className="relative">
              <input
                type="number"
                id="pos-x"
                placeholder=" "
                step={0.00000000000001}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setPosX(Number((e.target as HTMLInputElement).value))
                }
              />
              <label
                htmlFor="pos-x"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Posisi X
              </label>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="number"
                id="pos-y"
                placeholder=" "
                step={0.00000000000001}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setPosY(Number((e.target as HTMLInputElement).value))
                }
              />
              <label
                htmlFor="pos-y"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Posisi Y
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple
                placeholder=" "
                onInput={(e) => {
                  const files = (e.target as HTMLInputElement).files!;
                  console.log(files);
                  if (files) {
                    setImages(files);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <input
            type="button"
            value={"Batal"}
            className="bg-white w-full text-cus-blue rounded-lg p-2 hover:cursor-pointer hover:bg-cus-blue hover:text-white border border-cus-blue"
            onClick={props.onClose}
          />
          <input
            type="submit"
            className="bg-white w-full text-cus-orange rounded-lg p-2 hover:cursor-pointer hover:bg-cus-orange hover:text-white border border-cus-orange"
            value="Simpan"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddDirektoriKomunitasAktivitas;
