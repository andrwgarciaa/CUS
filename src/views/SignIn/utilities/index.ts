import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import { compare } from "bcryptjs";

export const signIn = async (dto: IUser) => {
  const data = await supabase
    .from("User")
    .select("*")
    .eq("email", dto.email)
    .limit(1)
    .single();

  const matched = await compare(dto.password, data.data.password);

  return matched ? data : null;
};
