import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";

export const signUp = async (dto: IUser) => {
  if (
    dto.name === "" ||
    dto.email === "" ||
    dto.password === "" ||
    dto.dob === new Date() ||
    dto.gender === 0
  ) {
    alert("Please fill in all the fields");
    throw new Error("Please fill in all the fields");
  } else {
    const data = await supabase.from("User").insert({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      date_of_birth: dto.dob,
      gender: dto.gender,
    });

    return data;
  }
};
