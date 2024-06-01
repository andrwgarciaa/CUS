import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import { compare } from "bcryptjs";

export const signIn = async (dto: IUser) => {
  const data = await supabase.from("User").select("*").eq("email", dto.email);

  const matched = await compare(dto.password, data.data?.[0].password);

  return matched ? data : null;
};
