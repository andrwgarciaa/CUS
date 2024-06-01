import { IPlace } from "../../../../../interfaces";
import { supabase } from "../../../../../utilities/supabaseClient";

export const getDirektoriDetailById = async (id: string | undefined) => {
  const response = await supabase.from("Place").select("*").eq("id", id);
  const data: IPlace | null = response.data ? response.data[0] : null;

  return data;
};
