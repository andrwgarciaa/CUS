import { CardProps } from "../interfaces";
import { truncateString } from "../utilities";

const DirektoriCard: React.FC<CardProps> = ({image, title, price, address, tags, rating}) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-65 flex-shrink-0 mb-2">
          <img className="w-full h-48 object-cover" src={image} alt={title} />
          <div className="p-4">
            <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-1">{truncateString(title, 40)}</h3>
            <div className="flex items-center bg-green-500 rounded-2xl px-2 py-1">
              <span className="text-white">{rating}★</span>
            </div>
            </div>
            <p className="text-gray-600 truncate mb-1">{truncateString(price, 40)}</p>
            <p className="text-gray-600 truncate mb-1">{truncateString(address, 40)}</p>
          
            <div className="mt-2 flex space-x-2">
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

export default DirektoriCard;