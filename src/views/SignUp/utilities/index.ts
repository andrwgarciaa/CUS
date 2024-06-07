import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(import.meta.env.VITE_SIGN_UP_SALT)
  );
  return hashedPassword;
};

export const signUp = async (dto: IUser) => {
  if (dto.email === "" || dto.password === "") {
    alert("Mohon isi semua data yang masih kosong");
    throw new Error("Mohon isi semua data yang masih kosong");
  } else {
    const encrypted = await encryptPassword(dto.password as string);

    const { data, error } = await supabase
      .from("User")
      .insert({
        name: dto.email.split("@")[0] + Math.floor(Math.random() * 1000),
        email: dto.email,
        password: encrypted,
      })
      .select("id");
    if (error) {
      console.log(error.message);
      alert("Daftar akun gagal");
      throw error;
    }

    return data;
  }
};
