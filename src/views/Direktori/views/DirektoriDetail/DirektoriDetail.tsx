import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlace, IStorageImage } from "../../../../interfaces";
import {
  archiveDirektori,
  checkDirektoriArchiveStatus,
  getDirektoriDetailById,
  unarchiveDirektori,
} from "./utilities";
import { PLACE_URL } from "../../../../constants";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";
import { SessionContext } from "../../../../contexts/SessionContext";

const DirektoriDetail = () => {
  const session = useContext(SessionContext);
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<IPlace | null>();
  const [images, setImages] = useState<IStorageImage[] | null>();
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getPlaceData = async (id: string | undefined) => {
    const data = await getDirektoriDetailById(id);
    setPlaceData(data.data);
    setImages(data.images?.data);
    setLoading(false);
  };

  const handleArchiveDirektori = async () => {
    if (!session.user) {
      alert("Anda harus login terlebih dahulu");
      return;
    }
    if (isArchived) {
      const data = await unarchiveDirektori(session.user?.id, placeData?.id);
      if (data.status === 204) {
        setIsArchived(false);
      } else {
        alert("Post gagal dihapus dari arsip");
      }
    } else {
      const data = await archiveDirektori(session.user?.id, placeData?.id);
      if (data.status === 201) {
        setIsArchived(true);
      } else {
        alert("Post gagal diarsipkan");
      }
    }
  };

  const checkArchive = async () => {
    const data = await checkDirektoriArchiveStatus(
      session.user?.id,
      placeData?.id
    );
    if (data) setIsArchived(true);
  };

  useEffect(() => {
    getPlaceData(id);
    checkArchive();
  }, [placeData?.id]);

  return (
    <>
      {!loading ? (
        <div className="w-screen p-12">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 h-72">
              <h1 className="text-3xl font-bold">{placeData?.name}</h1>
              <div>
                <p className="text-lg">
                  <strong>Lokasi:</strong> {placeData?.address}
                </p>
                {placeData?.price_min && placeData?.price_max && (
                  <p className="text-lg mt-2">
                    <strong>Price range:</strong> Rp
                    {placeData.price_min.toLocaleString("id-ID")} - Rp
                    {placeData.price_max.toLocaleString("id-ID")} / orang
                  </p>
                )}
                <p className="text-lg flex gap-2 mt-2">
                  <strong>Rating:</strong>{" "}
                  <span className="flex w-fit items-center bg-green-500 rounded-2xl px-2 py-1 h-8">
                    <span className="text-white">{placeData?.rating}★</span>
                  </span>
                </p>

                <p className="text-lg mt-2">
                  <strong>Phone:</strong> {placeData?.phone ?? "-"}
                </p>
              </div>
              {isArchived ? (
                <button
                  onClick={handleArchiveDirektori}
                  className="w-max px-4 py-2 rounded-lg text-white bg-cus-orange border-cus-orange border-2 hover:bg-white hover:text-black hover:border-cus-blue transition-all"
                >
                  Telah diarsipkan
                </button>
              ) : (
                <button
                  onClick={handleArchiveDirektori}
                  className="w-max px-4 py-2 rounded-lg border-cus-blue border-2 hover:bg-cus-orange hover:text-white hover:border-cus-orange transition-all"
                >
                  Arsipkan
                </button>
              )}
            </div>
            <img
              className="w-fit max-h-[20em] rounded-lg  object-cover"
              src={images ? images[0].signedUrl : PLACE_URL + "blank"}
              alt={placeData?.name}
            />
          </div>

          <h2 className="font-bold text-2xl mt-10 mb-2">Foto-foto</h2>
          <div
            // style={{
            //   display: "flex",
            //   gap: "10px",
            //   overflowX: "scroll",
            //   marginBottom: "20px",
            // }}
              className="flex space-x-4 overflow-x-auto mb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
          >
            {placeData?.has_photo ? (
              images?.map((photo, index) => (
                <img
                  key={index}
                  src={photo.signedUrl}
                  alt={`Foto ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              ))
            ) : (
              <p>Tidak ada foto untuk tempat ini</p>
            )}
          </div>
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </>
  );
};

export default DirektoriDetail;
