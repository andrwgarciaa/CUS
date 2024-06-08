import { IUser } from "../../../interfaces";

export declare interface IProfil extends IUser {
  statistik: IStatistikType;
  age: number;
}

export declare interface IStatistik {
  title: string;
  value: number;
}
export declare interface IStatistikType {
  totalPost: number | undefined;
  totalComment: number | undefined;
  totalUpvote: number | undefined;
  totalDownvote: number | undefined;
  totalActivitiesCreated: number | undefined;
  totalActivitiesJoined: number | undefined;
}
