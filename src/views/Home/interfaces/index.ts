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

export declare interface IHomeMap {
  id: number;
  name: string;
  pos_x: number;
  pos_y: number;
}
