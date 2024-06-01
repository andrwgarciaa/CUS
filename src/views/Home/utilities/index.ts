import { supabase } from "../../../utilities/supabaseClient";

export const getMarkersByCategoryId = async (id: number) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};
