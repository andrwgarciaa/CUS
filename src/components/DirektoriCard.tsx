import { Link } from "react-router-dom";
import { IPlace } from "../interfaces";
import { truncateString } from "../utilities";

const DirektoriCard: React.FC<IPlace> = (props: IPlace) => {
  return (
    <Link
      to={`/direktori/detail/${props.id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden w-72 flex-shrink-0 mb-2"
    >
      <img
        className="w-full h-48 object-cover"
        src={props.image}
        alt={props.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-1 mr-4">
            {truncateString(props.name, 40)}
          </h3>
          <div className="flex items-center bg-green-500 rounded-2xl px-2 py-1 w-fit h-8">
            <span className="text-white">{props.rating}★</span>
          </div>
        </div>
        {props.price_min ? (
          <p className="text-gray-600 truncate mb-1">
            Rp{props.price_min.toLocaleString("id-ID")} - Rp
            {props.price_max.toLocaleString("id-ID")}/orang
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
