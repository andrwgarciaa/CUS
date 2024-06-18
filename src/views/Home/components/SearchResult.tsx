import { Link } from "react-router-dom";
import { ISearchResultProps } from "../interfaces";

const SearchResult = (props: ISearchResultProps) => {
  return (
    <ul
      className={
        "search-result absolute top-12 w-1/3 max-h-[280px] rounded-2xl bg-white overflow-y-auto"
      }
    >
      {props.places.map((place) => (
        <Link to={`direktori/detail/${place.id}`}>
          <li
            key={place.id}
            className="hover:bg-gray-100 rounded-2xl cursor-pointer bg-white p-3 w-full h-14"
          >
            {place.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchResult;
