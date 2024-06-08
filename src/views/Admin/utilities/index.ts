import { IPlace } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";

export const addPlace = async (place: IPlace, images: FileList) => {
  const data = await supabase.from("Place").insert(place).select("*").single();
  console.log(data);
  if (images) {
    for (let i = 0; i < images.length; i++) {
      const image = images.item(i);
      if (image) {
        await supabase.storage
          .from("Place")
          .upload(`/${data.data.id}/${image.name}`, image);
      }
    }
  }

  return data;
};
