import { supabase } from "./supabaseClient";

export const getAllPlaces = async () => {
  const data = await supabase.from("Place").select("*");

  return data;
};
