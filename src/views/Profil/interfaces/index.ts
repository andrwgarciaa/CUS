import { IUser } from "../../../interfaces";

export declare interface IProfil extends IUser {
  votes: {
    totalUpvote: number;
    totalDownvote: number;
  };
  age: number;
}
