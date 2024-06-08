import { CardKomuProps } from "../interfaces";
import { truncateString } from "../../../utilities";

const DirektoriKomuCard: React.FC<CardKomuProps> = ({
  image,
  title,
  quote,
  category,
  member,
  rating,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-65 flex-shrink-0 mb-2">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-4 mr-4 truncate">
            {truncateString(title, 40)}
          </h3>
          <div className="flex w-fit items-center bg-green-500 rounded-2xl px-2 py-1 h-8">
            <span className="text-white">{rating}★</span>
          </div>
        </div>
        <p className="text-gray-600 truncate mb-1">
          {member.toLocaleString()} Orang telah bergabung
        </p>
        <p className="text-gray-600 truncate mb-1 italic">
          {truncateString(quote, 40)}
        </p>
        <div className="mt-2 flex space-x-2"></div>
      </div>
    </div>
  );
};

export default DirektoriKomuCard;
