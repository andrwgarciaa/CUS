import { supabase } from "../../../utilities/supabaseClient";
import { IComment, IPost } from "../interfaces";

// filtering done on client side since the data is still relatively small
export const getAllPosts = async () => {
  const data = await supabase.from("Post").select("*");

  return data;
};

export const getPostById = async (id: string | undefined) => {
  const data = await supabase.from("Post").select("*").eq("id", id).single();

  return data;
};

export const getCommentsByPostId = async (id: string | undefined) => {
  const data = await supabase
    .from("Comment")
    .select("*")
    .eq("post_id", id)
    .order("updated_at", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: true });

  return data;
};

export const addPost = async (dto: IPost) => {
  const data = await supabase.from("Post").insert(dto);

  return data;
};

export const addComment = async (dto: IComment) => {
  const data = await supabase.from("Comment").insert(dto);

  return data;
};

export const getFormattedDateAndTime = (date: Date) => {
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { formattedDate, formattedTime };
};
