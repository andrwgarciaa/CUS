import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlace, IStorageImage } from "../../../../interfaces";
import { getDirektoriDetailById } from "./utilities";
import { PLACE_URL } from "../../../../constants";
import LoadingWithMessage from "../../../../components/LoadingWithMessage";

const DirektoriDetail = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<IPlace | null>();
  const [images, setImages] = useState<IStorageImage[] | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const getPlaceData = async (id: string | undefined) => {
    const data = await getDirektoriDetailById(id);
    console.log("Fetched place data:", data);
    setPlaceData(data.data);
    setImages(data.images?.data);
    setLoading(false);
  };

  useEffect(() => {
    getPlaceData(id);
  }, []);
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
                  <p className="text-lg">
                    <strong>Price range:</strong> Rp
                    {placeData.price_min.toLocaleString("id-ID")} - Rp
                    {placeData.price_max.toLocaleString("id-ID")} / orang
                  </p>
                )}
                <p className="text-lg flex gap-2">
                  <strong>Rating:</strong>{" "}
                  <div className="flex w-fit items-center bg-green-500 rounded-2xl px-2 py-1 h-8">
                    <span className="text-white">{placeData?.rating}★</span>
                  </div>
                </p>

                <p className="text-lg">
                  <strong>Phone:</strong> {placeData?.phone ?? "-"}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#f87171",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  alignSelf: "flex-start",
                  justifySelf: "flex-end",
                }}
              >
                Arsip
              </button>
            </div>
            <img
              className="w-fit max-h-[20em] rounded-lg  object-cover"
              src={images ? images[0].signedUrl : PLACE_URL + "blank"}
              alt={placeData?.name}
            />
          </div>

          <h2 className="font-bold text-2xl">Foto-foto</h2>
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "scroll",
              marginBottom: "20px",
            }}
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
