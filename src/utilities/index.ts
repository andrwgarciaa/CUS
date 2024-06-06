import { IUser } from "../interfaces";
import { supabase } from "./supabaseClient";
import { compareSync } from "bcryptjs";

export const getUserDataById = async (id: string | undefined) => {
  const data = await supabase.from("User").select("*").eq("id", id).single();

  return data;
};

export const checkAdmin = (dto: IUser | null) => {
  if (!dto?.isAdmin) {
    return null;
  }

  const data = compareSync(import.meta.env.VITE_ADMIN_SECRET, dto.isAdmin);

  return data;
};

export const getAllPlaces = async () => {
  const data = await supabase.from("Place").select("*");

  return data;
};

export const getAllPlacesByCategoryId = async (id: string | undefined) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};

export const getAllPlaceCategories = async () => {
  const data = await supabase
    .from("PlaceCategories")
    .select("*")
    .order("id", { ascending: true });

  return data;
};

export const getPlaceCategoryById = async (id: string | undefined) => {
  const data = await supabase
    .from("PlaceCategories")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  return data;
};

export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
