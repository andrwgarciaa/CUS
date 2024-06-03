import { IPlace } from "../../../../../interfaces";

export declare interface ILihatSemua extends IPlace {
    PlaceCategories: {
        category:string,
        description: string
    }
}