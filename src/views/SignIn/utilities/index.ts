import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";

export const signIn = async (dto: IUser) => {
  const data = await supabase
    .from("User")
    .select("name, email, gender, date_of_birth")
    .eq("email", dto.email)
    .eq("password", dto.password);

  return data.data?.length !== 0;
};
