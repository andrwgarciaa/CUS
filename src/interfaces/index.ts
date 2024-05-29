export declare interface IUser {
  name?: string;
  email: string;
  password: string;
  gender?: number;
  dob?: Date;
}

export declare interface IPlaces {
  id: number;
  name: string;
  pos_x: number;
  pos_y: number;
  category_id: number;
}
