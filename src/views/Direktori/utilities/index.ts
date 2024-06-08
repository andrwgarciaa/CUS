import { supabase } from "../../../utilities/supabaseClient";

export const getImagesByPlaceId = async (id: string | undefined) => {
  const imagePaths = await (await supabase.storage.from("Place").list(id)).data;

  if (imagePaths && imagePaths?.length > 0) {
    const data = await supabase.storage.from("Place").createSignedUrls(
      imagePaths.map((image) => `${id}/${image.name}`),
      60
    );
    return data;
  }
};
