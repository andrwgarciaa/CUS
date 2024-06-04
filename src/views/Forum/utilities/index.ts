import { IUser } from "../../../interfaces";
import { supabase } from "../../../utilities/supabaseClient";
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

export const addComment = async (dto: IComment) => {
  const data = await supabase.from("Comment").insert(dto);

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

export const addVote = async (
  dto: IVote,
  element: "Post" | "Comment",
  id: string | undefined
) => {
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

export const removeVote = async (
  dto: IVote,
  element: "Post" | "Comment",
  id: string | undefined
) => {
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
  element: "Post" | "Comment",
  id: string | undefined
) => {
  let removeData, addData;
  if (initialVote === "upvote") {
    dto.type = initialVote;
    removeData = await removeVote(dto, element, id);
    dto.type = "downvote";
    addData = await addVote(dto, element, id);
  } else {
    dto.type = initialVote;
    removeData = await removeVote(dto, element, id);
    dto.type = "upvote";
    addData = await addVote(dto, element, id);
  }

  return { removeData, addData };
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
