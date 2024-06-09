import { supabase } from "../../../utilities/supabaseClient";

export const getArchiveByType = async (
  userId: string | undefined,
  type: string
) => {
  let data;
  const allId = await supabase
    .from("Favorite")
    .select("*")
    .eq("user_id", userId);

  if (allId.data) {
    if (type === "Forum") {
      data = await supabase
        .from("Post")
        .select("*")
        .in(
          "id",
          allId.data.filter((item) => item.post_id).map((item) => item.post_id)
        );
    }
    if (type === "Direktori") {
      data = await supabase
        .from("Place")
        .select("*")
        .in(
          "id",
          allId.data
            .filter((item) => item.place_id)
            .map((item) => item.place_id)
        );
    }
    if (type === "Komunitas") {
      data = await supabase
        .from("CommunityActivity")
        .select("*")
        .in(
          "id",
          allId.data
            .filter((item) => item.community_id)
            .map((item) => item.community_id)
        );
    }
  }

  return data;
};

export const checkArchiveByUserId = async (userId: string | undefined) => {
  const data = await supabase
    .from("Favorite")
    .select("*")
    .eq("user_id", userId);

  return data;
};
