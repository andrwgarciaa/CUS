import { Link } from "react-router-dom";
import { ISearchResultProps } from "../interfaces";

const SearchResult = (props: ISearchResultProps) => {
  return (
    <ul className="absolute top-10 w-1/3">
      {props.places.map((place) => (
        <Link to={`direktori/detail/${place.id}`}>
          <li
            key={place.id}
            className="border border-black bg-white p-3 w-full"
          >
            {place.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchResult;
