export declare interface IUser {
  id?: string;
  name?: string;
  email: string;
  password?: string | undefined;
  gender_id?: number;
  description?: string;
  date_of_birth?: Date;
  has_photo?: boolean;
  created_at?: Date;
  updated_at?: Date;
  isAdmin?: string;
}

export declare interface IPlace {
  id?: number;
  name: string;
  pos_x?: number;
  pos_y?: number;
  price_min?: number;
  price_max?: number;
  rating: number;
  address: string;
  phone?: string;
  category_id?: number;
  has_photo?: boolean;
}

export declare interface ICategory {
  id: number;
  category: string;
  category_simplified: string;
  description: string;
  has_photo: boolean;
  category_type: number;
}

export declare interface ISessionContext {
  user: IUser | null;
  isLoggedIn: boolean;
  setSession: (keepLoggedIn: boolean, user: IUser) => void;
  removeSession: () => void;
}

export declare interface IStorageImage {
  error: string | null;
  path: string | null;
  signedUrl: string;
}
