import { supabase } from "../../../utilities/supabaseClient";

export const getAllPlaces = async () => {
  const data = await supabase.from("Place").select("*");

  return data;
};

export const getAllPlacesByCategoryId = async (id: string | undefined) => {
  const data = await supabase.from("Place").select("*").eq("category_id", id);

  return data;
};

export const getAllPlaceCategories = async () => {
  const data = await supabase
    .from("Category")
    .select("*")
    .eq("category_type", 1)
    .order("id", { ascending: true });

  return data;
};

export const getPlaceCategoryById = async (id: string | undefined) => {
  const data = await supabase
    .from("Category")
    .select("*")
    .eq("id", id)
    .eq("category_type", 1)
    .limit(1)
    .single();

  return data;
};

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
