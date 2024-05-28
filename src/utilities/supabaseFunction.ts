import { IUser } from "../interfaces";
import { supabase } from "./supabaseClient";

export const signUp = async (dto: IUser) => {
  const { data, error } = await supabase.auth.signUp({
    email: dto.email,
    password: dto.password,
    options: {
      data: {
        name: dto.name,
        dob: dto.dob,
        gender: dto.gender,
      },
    },
  });
  return { data, error };
};

export const signIn = async (dto: IUser) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password,
  });
  return { data, error };
};
