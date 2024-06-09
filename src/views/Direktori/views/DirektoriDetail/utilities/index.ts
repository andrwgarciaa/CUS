import { IPlace } from "../../../../../interfaces";
import { supabase } from "../../../../../utilities/supabaseClient";
import { checkArchiveByUserId } from "../../../../Arsip/utilities";
import { getImagesByPlaceId } from "../../../utilities";

export const getDirektoriDetailById = async (id: string | undefined) => {
  const response = await supabase.from("Place").select("*").eq("id", id);
  const data: IPlace | null = response.data ? response.data[0] : null;

  const images = await getImagesByPlaceId(id);
  return { data, images };
};

export const archiveDirektori = async (
  userId: string | undefined,
  placeId: number | undefined
) => {
  const data = await supabase.from("Favorite").insert({
    user_id: userId,
    place_id: placeId,
  });

  return data;
};

export const unarchiveDirektori = async (
  userId: string | undefined,
  placeId: number | undefined
) => {
  const data = await supabase
    .from("Favorite")
    .delete()
    .eq("user_id", userId)
    .eq("place_id", placeId);

  return data;
};

export const checkArchiveStatus = async (
  userId: string | undefined,
  placeId: number | undefined
) => {
  const data = await checkArchiveByUserId(userId);
  const archived = data.data?.filter((item) => item.place_id === placeId);

  return archived ? archived?.length > 0 : false;
};
