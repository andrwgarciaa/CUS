import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { ICategory, IPlace } from "../../../interfaces";
import { addPlace } from "../utilities";
import { SessionContext } from "../../../contexts/SessionContext";
import { getAllPlaceCategories } from "../../Direktori/utilities";

const AddDirektoriModal = (props: any) => {
  const session = useContext(SessionContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [category, setCategory] = useState(0);
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryList, setCategoryList] = useState<
    { label: string; value: number }[]
  >([{ label: "Pilih kategori", value: 0 }]);
  const [posX, setPosX] = useState("");
  const [posY, setPosY] = useState("");
  const [images, setImages] = useState<FileList | undefined>();

  const fetchPlaceCategories = async () => {
    const data = await getAllPlaceCategories();
    if (data.data) {
      setCategoryList([
        { label: "Pilih kategori", value: 0 },
        ...(data.data.map((category: ICategory) => ({
          label: category.category,
          value: category.id,
        })) || []),
      ]);
    }
  };

  const handleAddDirektori = async (e: any) => {
    if (!session.isLoggedIn && !session.user?.isAdmin) {
      alert("Anda tidak memiliki akses");
      return;
    }

    if (!name || !address || !rating || !posX || !posY) {
      alert("Data tidak boleh kosong");
      return;
    }

    e.preventDefault();
    const dto: IPlace = {
      name,
      address,
      phone,
      rating: parseFloat(rating),
      price_min: priceMin,
      price_max: priceMax,
      category_id: category,
      pos_x: parseFloat(posX),
      pos_y: parseFloat(posY),
      has_photo: images && images.length > 0,
    };

    const data = await addPlace(dto, images!);
    if (data.status === 201) {
      setName("");
      setAddress("");
      setPhone("");
      setRating("");
      setPriceMin(0);
      setPriceMax(0);
      setCategory(0);
      setPosX("");
      setPosY("");
      setImages(undefined);
      (document.querySelector("#formDirektori") as HTMLFormElement)?.reset();
      props.onClose();

      alert("Data berhasil ditambahkan");
    } else alert("Data gagal ditambahkan");
  };

  window.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).classList.contains("option"))
      setOpenCategory(false);
  });

  useEffect(() => {
    fetchPlaceCategories();
  }, []);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <h2 className="m-2 text-4xl font-bold">Tambah Data Direktori</h2>
      <form
        id="formDirektori"
        onSubmit={handleAddDirektori}
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
                Nama tempat
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="text"
                id="alamat"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setAddress((e.target as HTMLInputElement).value)
                }
              />
              <label
                htmlFor="alamat"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Alamat tempat
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="phone"
                id="phone"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="phone"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Nomor telepon
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full flex gap-2">
          <div>
            <div className="relative">
              <input
                type="number"
                id="rating"
                placeholder=" "
                step={0.01}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setRating((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="rating"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Rating
              </label>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="number"
                id="price-min"
                placeholder=" "
                min={0}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setPriceMin(Number((e.target as HTMLInputElement).value))
                }
              />
              <label
                htmlFor="price-min"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Harga terendah
              </label>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type="number"
                id="price-max"
                placeholder=" "
                min={0}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) =>
                  setPriceMax(Number((e.target as HTMLInputElement).value))
                }
              />
              <label
                htmlFor="price-max"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Harga tertinggi
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full grid grid-cols-8 gap-2">
          <div className="col-span-4">
            <div className="relative option">
              <input
                id="category"
                placeholder=" "
                value={
                  categoryList.filter((x) => x.value === category)[0].label
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
                  {categoryList.map((category) => (
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
          <div className="col-span-2">
            <div className="relative">
              <input
                type="number"
                id="pos-x"
                placeholder=" "
                step={0.00000000000001}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setPosX((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="pos-x"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Posisi X
              </label>
            </div>
          </div>
          <div className="col-span-2">
            <div className="relative">
              <input
                type="number"
                id="pos-y"
                placeholder=" "
                step={0.00000000000001}
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setPosY((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="pos-y"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Posisi Y
              </label>
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

export default AddDirektoriModal;
