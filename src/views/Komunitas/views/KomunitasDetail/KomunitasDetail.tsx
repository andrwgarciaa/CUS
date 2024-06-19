import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  archiveKomunitas,
  checkKomunitasArchiveStatus,
  getCommunityActivityById,
  getCommunityActivityCategoryById,
  unarchiveKomunitas,
} from "../../utilities";
import { ICommunityActivity } from "../../interfaces";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";
import { IStorageImage } from "../../../../interfaces";
import { COMMUNITY_ACTIVITY_URL } from "../../../../constants";
import { SessionContext } from "../../../../contexts/SessionContext";

const KomunitasDetail = () => {
  const session = useContext(SessionContext);
  const { id } = useParams();
  const [data, setData] = useState<ICommunityActivity>();
  const [categoryName, setCategoryName] = useState<string>();
  const [images, setImages] = useState<IStorageImage[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isJoined] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);

  const fetchData = async () => {
    const data = await getCommunityActivityById(id);
    fetchCategoryName();
    if (data.data) {
      setData(data.data);
      setImages(data.images?.data);
      setLoading(false);
    }
  };

  const fetchCategoryName = async () => {
    const data = await getCommunityActivityCategoryById(id);
    if (data) setCategoryName(data.data.category);
  };

  const handleJoinKomunitas = async () => {
    alert("hanya dummy");
    return;
    if (!session.user) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    if (isJoined) {
      // Leave Komunitas
    } else {
      // Join Komunitas
    }
  };

  const handleArchiveKomunitas = async () => {
    if (!session.user) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    if (isArchived) {
      const res = await unarchiveKomunitas(session.user?.id, data?.id);
      if (res.status === 204) {
        setIsArchived(false);
      } else {
        alert(
          `${
            data?.type_id === 2 ? "Komunitas" : "Aktivitas"
          } gagal dihapus dari arsip`
        );
      }
    } else {
      const res = await archiveKomunitas(session.user?.id, data?.id);
      if (res.status === 201) {
        setIsArchived(true);
      } else {
        alert(
          `${data?.type_id === 2 ? "Komunitas" : "Aktivitas"} gagal diarsipkan`
        );
      }
    }
  };

  const checkArchive = async () => {
    const res = await checkKomunitasArchiveStatus(session.user?.id, data?.id);
    if (res) setIsArchived(true);
  };

  useEffect(() => {
    fetchData();
    checkArchive();
  }, [data?.id]);

  return (
    <>
      {!loading ? (
        <div className="w-screen p-12">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 h-72">
              <h1 className="text-3xl font-bold">{data?.name}</h1>
              <p className="text-lg italic">
                <strong>"{data?.motto ?? "Tidak ada motto"}"</strong>
              </p>
              <p className="text-lg">
                <strong>Tentang kami:</strong> {data?.description ?? "-"}
              </p>
              <p className="text-lg">
                {data?.type_id === 2
                  ? `${data?.member_count} orang telah bergabung!`
                  : `Tersisa ${data?.member_count?.toString()}/25 slot`}
              </p>
              <span className="text-white bg-gray-400 rounded-2xl flex w-fit items-center px-2 py-1 h-8">
                {categoryName}
              </span>
              <div className="flex gap-4">
                {isJoined ? (
                  <button
                    onClick={handleJoinKomunitas}
                    className="w-max px-4 py-2 rounded-lg text-white bg-cus-blue border-cus-blue border-2 hover:bg-white hover:text-black hover:border-cus-blue transition-all"
                  >
                    Keluar dari komunitas
                  </button>
                ) : (
                  <button
                    onClick={handleJoinKomunitas}
                    className="w-max px-4 py-2 rounded-lg border-cus-blue border-2 hover:bg-cus-blue hover:text-white hover:border-cus-blue transition-all"
                  >
                    Bergabung
                  </button>
                )}
                {isArchived ? (
                  <button
                    onClick={handleArchiveKomunitas}
                    className="w-max px-4 py-2 rounded-lg text-white bg-cus-orange border-cus-orange border-2 hover:bg-white hover:text-black hover:border-cus-blue transition-all"
                  >
                    Telah diarsipkan
                  </button>
                ) : (
                  <button
                    onClick={handleArchiveKomunitas}
                    className="w-max px-4 py-2 rounded-lg border-cus-blue border-2 hover:bg-cus-orange hover:text-white hover:border-cus-orange transition-all"
                  >
                    Arsipkan
                  </button>
                )}
              </div>
            </div>
            <img
              className="w-fit max-h-[20em] rounded-lg  object-cover"
              src={
                images ? images[0].signedUrl : COMMUNITY_ACTIVITY_URL + "blank"
              }
              alt={data?.name}
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
            className="flex overflow-x-auto space-x-4 mb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
          >
            {data?.has_photo ? (
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
              <p>
                Tidak ada foto untuk{" "}
                {data?.type_id === 2 ? "komunitas" : "aktivitas"} ini
              </p>
            )}
          </div>
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </>
  );
};

export default KomunitasDetail;
