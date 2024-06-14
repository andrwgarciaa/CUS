import { IPlace, IStorageImage } from "../../../../../interfaces";

export declare interface ILihatSemua extends IPlace {
  PlaceCategories: {
    category: string;
    description: string;
  };
}

export declare interface IDirektoriDetail extends IPlace {
  images: IStorageImage[] | undefined;
}
