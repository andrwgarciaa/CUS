export declare interface IUser {
  name?: string;
  email: string;
  password: string;
  gender?: number;
  dob?: Date;
}

export declare interface IPlace {
  id: number;
  name: string;
  pos_x: number;
  pos_y: number;
  price_min: number;
  price_max: number;
  rating: number;
  address: string;
  category_id: number;
}

export declare interface CardProps{
  image: string;
  title: string;
  price: string;
  address: string;
  tags: string[];
  rating: string;
}
