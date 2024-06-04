import { supabase } from "../../../utilities/supabaseClient";
import { IProfil, IStatistikType } from "../interfaces";

export const getUserByName = async (name: string | undefined) => {
  let dto: IProfil;
  let statistik: IStatistikType;
  const data = await supabase
    .from("User")
    .select("*")
    .eq("name", name)
    .single();

  const userId = data.data.id;
  const postsCount = await getPostCountByUser(userId);
  const commentsCount = await getCommentCountByUser(userId);
  const votes = await getTotalVotesOnUser(userId);
  const age = data.data.date_of_birth
    ? new Date().getFullYear() - new Date(data.data.date_of_birth).getFullYear()
    : 0;

  statistik = {
    totalPost: postsCount,
    totalComment: commentsCount,
    totalUpvote: votes.totalUpvote,
    totalDownvote: votes.totalDownvote,
    totalActivitiesCreated: 0,
    totalActivitiesJoined: 0,
  };

  dto = { ...data.data, statistik, age };

  return dto;
};

const getPostCountByUser = async (userId: string) => {
  const data = await supabase.from("Post").select("id").eq("user_id", userId);

  return data.data?.length;
};

const getCommentCountByUser = async (userId: string) => {
  const data = await supabase
    .from("Comment")
    .select("id")
    .eq("user_id", userId);

  return data.data?.length;
};

const getTotalVotesOnUser = async (userId: string) => {
  const postData = await supabase
    .from("Post")
    .select("upvote, downvote")
    .eq("user_id", userId);

  const commentData = await supabase
    .from("Comment")
    .select("upvote, downvote")
    .eq("user_id", userId);

  const totalUpvote = calculateTotalVotes(
    postData.data || [],
    commentData.data || [],
    "upvote"
  );
  const totalDownvote = calculateTotalVotes(
    postData.data || [],
    commentData.data || [],
    "downvote"
  );

  function calculateTotalVotes(
    postData: any[],
    commentData: any[],
    voteType: string
  ) {
    const postVotes = postData?.reduce(
      (acc: number, curr: any) => acc + curr[voteType],
      0
    );
    const commentVotes = commentData?.reduce(
      (acc: number, curr: any) => acc + curr[voteType],
      0
    );
    return postVotes + commentVotes;
  }

  return { totalUpvote, totalDownvote };
};
