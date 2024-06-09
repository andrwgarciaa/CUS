import { CardKomuProps } from "../interfaces";
import { truncateString } from "../../../utilities";

const DirektoriKomuCard: React.FC<CardKomuProps> = ({
  image,
  title,
  quote,
  age,
  category,
  member
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-65 flex-shrink-0 mb-2">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-4 mr-4 truncate">
            {truncateString(title, 40)}
          </h3>
        </div>
          <p className="text-gray-600 truncate mb-1">
            {member.toLocaleString()} Orang telah bergabung
          </p>
          <p className="text-gray-600 truncate mb-1 italic">
            {truncateString(quote, 40)}
          </p>
        <div className="flex">
            <span className="text-white bg-blue-500 rounded-2xl flex w-fit items-center px-2 py-1 h-8">{age}+</span>
            <div className="px-2">
              <span className="text-white bg-gray-400 rounded-2xl flex w-fit items-center px-2 py-1 h-8">{category}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DirektoriKomuCard;
