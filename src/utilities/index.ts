import { supabase } from "./supabaseClient";

export const checkUser = () => {
  const user = localStorage.getItem("user") ?? sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const getUserDataById = async (id: string | undefined) => {
  const data = await supabase.from("User").select("*").eq("id", id).single();

  return data;
};

export const getAllPlaces = async () => {
  const data = await supabase.from("Place").select("*");

  return data;
};

export const getAllPlacesByCategoryId = async (id: number) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};

export const getAllPlaceCategories = async () => {
  const data = await supabase.from("PlaceCategories").select("*");

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
