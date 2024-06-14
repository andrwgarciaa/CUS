import { supabase } from "../../../utilities/supabaseClient";
import { checkArchiveByUserId } from "../../Arsip/utilities";
import { ICommunityActivity } from "../interfaces";

export const getAllCommunityActivity = async () => {
  const komunitas = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("type_id", 2);

  const aktivitas = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("type_id", 3);

  return { komunitas, aktivitas };
};

export const getCommunityActivityById = async (id: string | undefined) => {
  const response = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("id", id);

  const data: ICommunityActivity | null = response.data
    ? response.data[0]
    : null;

  const images = await getCommunityActivityImagesByPlaceId(id);
  return { data, images };
};

export const getCommunityActivityByTypeId = async (
  typeId: string | undefined
) => {
  const data = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("type_id", typeId);

  return data;
};

export const getAllCommunityActivityCategories = async () => {
  const komunitas = await supabase
    .from("Category")
    .select("*")
    .eq("category_type", 2)
    .order("id", { ascending: true });

  const aktivitas = await supabase
    .from("Category")
    .select("*")
    .eq("category_type", 3)
    .order("id", { ascending: true });

  return { komunitas, aktivitas };
};

export const getCommunityActivityCategoryById = async (
  id: string | undefined
) => {
  const data = await supabase
    .from("CommunityActivity")
    .select("*")
    .eq("id", id)
    .single();

  const category = await supabase
    .from("Category")
    .select("*")
    .eq("id", data.data.category_id)
    .single();

  return category;
};

export const getCommunityActivityImagesByPlaceId = async (
  id: string | undefined
) => {
  const imagePaths = await (
    await supabase.storage.from("CommunityActivity").list(id)
  ).data;

  if (imagePaths && imagePaths?.length > 0) {
    const data = await supabase.storage
      .from("CommunityActivity")
      .createSignedUrls(
        imagePaths.map((image) => `${id}/${image.name}`),
        60
      );
    return data;
  }
};

export const archiveKomunitas = async (
  userId: string | undefined,
  communityId: string | undefined
) => {
  const data = await supabase.from("Favorite").insert({
    user_id: userId,
    community_id: communityId,
  });

  return data;
};

export const unarchiveKomunitas = async (
  userId: string | undefined,
  communityId: string | undefined
) => {
  const data = await supabase
    .from("Favorite")
    .delete()
    .eq("user_id", userId)
    .eq("community_id", communityId);

  return data;
};

export const checkKomunitasArchiveStatus = async (
  userId: string | undefined,
  communityId: string | undefined
) => {
  const data = await checkArchiveByUserId(userId);
  const archived = data.data?.filter(
    (item) => item.community_id === communityId
  );
  return archived ? archived?.length > 0 : false;
};
