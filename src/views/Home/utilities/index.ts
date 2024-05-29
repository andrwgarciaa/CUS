import { supabase } from "../../../utilities/supabaseClient";

export const getPlaceCategories = async () => {
  const data = await supabase.from("PlaceCategories").select("*");

  return data;
};

export const getMarkersByCategoryId = async (id: number) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};
