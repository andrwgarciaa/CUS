import { IUser } from "../interfaces";
import { supabase } from "./supabaseClient";
import { compareSync } from "bcryptjs";

export const getUserDataById = async (id: string | undefined) => {
  const data = await supabase.from("User").select("*").eq("id", id).single();

  return data;
};

export const checkAdmin = (dto: IUser | null) => {
  if (!dto?.isAdmin) {
    return null;
  }

  const data = compareSync(import.meta.env.VITE_ADMIN_SECRET, dto.isAdmin);

  return data;
};

export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
