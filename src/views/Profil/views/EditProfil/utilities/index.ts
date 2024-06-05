import { IUser } from "../../../../../interfaces";
import { supabase } from "../../../../../utilities/supabaseClient";

export const updateProfil = async (dto: IUser) => {
  const data = await supabase
    .from("User")
    .update(dto)
    .eq("id", dto.id)
    .select("*")
    .single();

  return data;
};

export const uploadProfilePhoto = async (
  file: File,
  userId: string | undefined
) => {
  const data = await supabase.storage.from("Profile").upload(`${userId}`, file);
  console.log(data);
  return data;
};
