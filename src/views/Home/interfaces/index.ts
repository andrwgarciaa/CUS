import { IPlaces } from "../../../interfaces";

export declare interface IHomeProps {
  setSelectedCategory: (id: number) => void;
}

export declare interface ISearchBarProps extends IHomeProps {
  allPlaces: IPlaces[] | null;
}

export declare interface ISearchResultProps {
  places: IPlaces[];
}
