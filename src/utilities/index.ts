import { supabase } from "./supabaseClient";

export const getAllPlaces = async () => {
  const data = await supabase.from("Place").select("*");

  return data;
};

export const getAllPlacesByCategoryId = async (id: string | undefined) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id)

  return data;
}

export const getAllPlaceCategories = async () => {
  const data = await supabase.from("PlaceCategories").select("*");

  return data;
};

export const getPlaceCategoryById = async (id: string | undefined) => {
  const data = await supabase.from("PlaceCategories").select("*").eq("id", id).limit(1).single();

  return data;
}
 
export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
