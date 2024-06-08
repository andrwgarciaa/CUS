import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import { hash, compare } from "bcryptjs";

export const signIn = async (dto: IUser) => {
  let isAdmin = "";
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

  if (matched) {
    const checkAdmin = await checkUserAdmin(data.data.id);

    if (checkAdmin.status === 200) {
      isAdmin = await hash(
        import.meta.env.VITE_ADMIN_SECRET,
        Number(import.meta.env.VITE_ADMIN_SALT)
      );
    }
  }
  return matched ? { ...data.data, isAdmin } : null;
};

const checkUserAdmin = async (id: string | undefined) => {
  const data = await supabase
    .from("Admin")
    .select("*")
    .eq("user_id", id)
    .single();

  return data;
};
