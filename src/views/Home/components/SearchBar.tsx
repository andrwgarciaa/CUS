import { useState } from "react";
import { IPlace } from "../../../interfaces";
import { ISearchBarProps } from "../interfaces";
import MapFilter from "./MapFilter";
import SearchResult from "./SearchResult";

const SearchBar = (props: ISearchBarProps) => {
  const [filteredPlaces, setFilteredPlaces] = useState<IPlace[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue) return setFilteredPlaces([]);
    const filtered = props.allPlaces?.filter(
      (place) =>
        place.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        place.name.toLowerCase().includes(` ${searchValue.toLowerCase()}`)
    );
    setFilteredPlaces(filtered?.length ? filtered : []);
  };

  return (
    <div className="absolute left-12 top-0 m-4 z-[1000] w-2/3 flex gap-4">
      <input
        type="text"
        placeholder="Cari..."
        className="p-3 w-1/3 rounded-2xl shadow-lg"
        onInput={handleSearch}
      />
      {filteredPlaces?.length > 0 ? (
        <SearchResult places={filteredPlaces} />
      ) : null}
      <MapFilter setSelectedCategory={props.setSelectedCategory} />
    </div>
  );
};

export default SearchBar;
