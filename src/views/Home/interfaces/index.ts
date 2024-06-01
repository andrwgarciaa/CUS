import { IPlace } from "../../../interfaces";

export declare interface IHomeProps {
  setSelectedCategory: (id: number) => void;
}

export declare interface ISearchBarProps extends IHomeProps {
  allPlaces: IPlace[] | null;
}

export declare interface ISearchResultProps {
  places: IPlace[];
}
