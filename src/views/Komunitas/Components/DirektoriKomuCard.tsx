import { CardKomuProps } from "../interfaces";
import { truncateString } from "../../../utilities";

const DirektoriKomuCard: React.FC<CardKomuProps> = ({image, title, quote, category, member, tags}) => {
  return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-65 flex-shrink-0 mb-2">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{truncateString(title, 40)}</h3>
          <p className="text-gray-600 truncate mb-1">{member.toLocaleString()} Orang telah bergabung</p>
          <p className="text-gray-600 truncate mb-1 italic">{truncateString(quote, 40)}</p>
          <div className="mt-2 flex space-x-2">
          <span className="bg-red-800 text-white text-xs font-semibold rounded-full p-1">{category} </span>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-4 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default DirektoriKomuCard;