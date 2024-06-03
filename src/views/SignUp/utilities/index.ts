import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const signUp = async (dto: IUser) => {
  if (dto.email === "" || dto.password === "") {
    alert("Please fill in all the fields");
    throw new Error("Please fill in all the fields");
  } else {
    const encrypted = await encryptPassword(dto.password);

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
      alert("Sign up failed");
      throw error;
    }

    return data;
  }
};
