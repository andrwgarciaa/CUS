import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import { compare } from "bcryptjs";

export const signIn = async (dto: IUser) => {
  const data = await supabase
    .from("User")
    .select("*")
    .eq("email", dto.email)
    .single();

  // workaround because of possibly undefined password on interface
  const matched = await compare(
    dto.password ? dto.password : "",
    data.data.password
  );

  return matched ? data : null;
};
