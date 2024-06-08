import { supabase } from "../../../utilities/supabaseClient";

export const getMarkersByCategoryId = async (id: number) => {
  if (id === 0) {
    const data = await supabase.from("Place").select("*");

    return data;
  }
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};
