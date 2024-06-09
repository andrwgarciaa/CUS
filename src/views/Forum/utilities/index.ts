import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
import { checkArchiveByUserId } from "../../Arsip/utilities";
import { IComment, IPost, IVote } from "../interfaces";

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
    .order("created_at", { ascending: false });

  return data;
};

export const addPost = async (dto: IPost) => {
  const data = await supabase.from("Post").insert(dto);

  return data;
};

export const editPost = async (dto: IPost) => {
  const data = await supabase
    .from("Post")
    .update(dto)
    .eq("id", dto.id)
    .single();

  return data;
};

export const deletePost = async (id: string | undefined) => {
  const data = await supabase.from("Post").delete().eq("id", id);

  return data;
};

export const addComment = async (dto: IComment) => {
  const data = await supabase.from("Comment").insert(dto);

  return data;
};

export const editComment = async (dto: IComment) => {
  const data = await supabase
    .from("Comment")
    .update(dto)
    .eq("id", dto.id)
    .single();

  return data;
};

export const deleteComment = async (id: string | undefined) => {
  const data = await supabase.from("Comment").delete().eq("id", id);

  return data;
};

export const checkVoteStatus = async (
  user: IUser | null,
  id: string | undefined,
  type: "Post" | "Comment"
) => {
  const data = await supabase
    .from("Vote")
    .select("*")
    .eq("user_id", user?.id)
    .eq(`${type.toLowerCase()}_id`, id);

  return data;
};

export const addVote = async (dto: IVote, element: "Post" | "Comment") => {
  let dataPost;
  const dataVote = await supabase.from("Vote").insert({
    ...dto,
    type: dto.type === "upvote" ? 1 : 2,
    [`${element.toLowerCase()}_id`]:
      element === "Post" ? dto.post_id : dto.comment_id,
  });

  const currentVote = await supabase
    .from(element)
    .select("*")
    .eq("id", element === "Post" ? dto.post_id : dto.comment_id)
    .single();

  if (currentVote.data) {
    const currentCount = currentVote.data[dto.type];
    dataPost = await supabase
      .from(element)
      .update({ [dto.type]: currentCount + 1 })
      .eq("id", element === "Post" ? dto.post_id : dto.comment_id);
  }

  return { dataVote, dataPost };
};

export const removeVote = async (dto: IVote, element: "Post" | "Comment") => {
  let dataPost;
  const dataVote = await supabase
    .from("Vote")
    .delete()
    .eq("user_id", dto.user_id)
    .eq(
      `${element.toLowerCase()}_id`,
      element === "Post" ? dto.post_id : dto.comment_id
    );

  const currentVote = await supabase
    .from(element)
    .select("*")
    .eq("id", element === "Post" ? dto.post_id : dto.comment_id)
    .single();

  if (currentVote.data) {
    const currentCount = currentVote.data[dto.type];

    dataPost = await supabase
      .from(element)
      .update({ [dto.type]: currentCount - 1 })
      .eq("id", element === "Post" ? dto.post_id : dto.comment_id);
  }

  return { dataVote, dataPost };
};

export const swapVote = async (
  dto: IVote,
  initialVote: string,
  element: "Post" | "Comment"
) => {
  let removeData, addData;
  if (initialVote === "upvote") {
    dto.type = initialVote;
    removeData = await removeVote(dto, element);
    dto.type = "downvote";
    addData = await addVote(dto, element);
  } else {
    dto.type = initialVote;
    removeData = await removeVote(dto, element);
    dto.type = "upvote";
    addData = await addVote(dto, element);
  }

  return { removeData, addData };
};

export const archivePost = async (
  userId: string | undefined,
  postId: string | undefined
) => {
  const data = await supabase.from("Favorite").insert({
    user_id: userId,
    post_id: postId,
  });

  return data;
};

export const unarchivePost = async (
  userId: string | undefined,
  postId: string | undefined
) => {
  const data = await supabase
    .from("Favorite")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  return data;
};

export const checkArchiveStatus = async (
  userId: string | undefined,
  postId: string | undefined
) => {
  const data = await checkArchiveByUserId(userId);
  const archived = data.data?.filter((item) => item.post_id === postId);

  return archived ? archived?.length > 0 : false;
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
    hour12: false,
  });

  return { formattedDate, formattedTime };
};
