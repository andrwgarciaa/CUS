import { supabase } from "../../../utilities/supabaseClient";
import { IProfil } from "../interfaces";

export const getUserByName = async (name: string | undefined) => {
  let dto: IProfil;
  const data = await supabase
    .from("User")
    .select("*")
    .eq("name", name)
    .single();
  const userId = data.data.id;
  const forumCreated = await getPostCountByUser(userId);
  const votes = await getTotalVotesOnUser(userId);
  const age = data.data.date_of_birth
    ? new Date().getFullYear() - new Date(data.data.date_of_birth).getFullYear()
    : 0;
  dto = { ...data.data, forumCreated, votes, age };
  return dto;
};

const getPostCountByUser = async (userId: string) => {
  const data = await supabase.from("Post").select("id").eq("user_id", userId);

  return data.data?.length;
};

const getTotalVotesOnUser = async (userId: string) => {
  const data = await supabase
    .from("Post")
    .select("upvote, downvote")
    .eq("user_id", userId);

  const totalUpvote = data.data?.reduce(
    (acc: number, curr: any) => acc + curr.upvote,
    0
  );
  const totalDownvote = data.data?.reduce(
    (acc: number, curr: any) => acc + curr.downvote,
    0
  );

  return { totalUpvote, totalDownvote };
};
