import { Link } from "react-router-dom";
import { IPlace, IStorageImage } from "../interfaces";
import { truncateString } from "../utilities";
import { PLACE_URL } from "../constants";
import { useEffect, useState } from "react";
import { getImagesByPlaceId } from "../views/Direktori/utilities";
import Spinner from "./Spinner";

const DirektoriCard: React.FC<IPlace> = (props: IPlace) => {
  const [images, setImages] = useState<IStorageImage[] | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchImages = async () => {
    if (props.id) {
      const data = await getImagesByPlaceId(props.id.toString());
      setImages(data?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Link
      to={`/direktori/detail/${props.id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden w-72 h-50 flex-shrink-0 mb-2"
    >
      {!loading ? (
        <img
          className="w-full h-48 object-cover"
          src={images ? images[0].signedUrl : PLACE_URL + "blank"}
          alt={props.name}
        />
      ) : (
        <Spinner />
      )}
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-4 mr-4 truncate">
            {truncateString(props.name, 40)}
          </h3>
          <div className="flex w-fit items-center bg-green-500 rounded-2xl px-2 py-1 h-8">
            <span className="text-white">{props.rating}★</span>
          </div>
        </div>
        {props.price_min ? (
          <p className="text-gray-600 truncate mb-2">
            Rp{props.price_min.toLocaleString("id-ID")} - Rp
            {props.price_max?.toLocaleString("id-ID")} per orang
          </p>
        ) : null}
        <p className="text-gray-600 truncate mb-1">
          {truncateString(props.address, 40)}
        </p>
      </div>
    </Link>
  );
};

export default DirektoriCard;
