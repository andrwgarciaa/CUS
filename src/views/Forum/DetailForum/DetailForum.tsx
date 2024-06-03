import { useParams } from "react-router-dom";
import {
  addComment,
  addVote,
  checkVoteStatus,
  getCommentsByPostId,
  getFormattedDateAndTime,
  getPostById,
  removeVote,
  swapVote,
} from "../utilities";
import { useContext, useEffect, useRef, useState } from "react";
import { IComment, IPost, IVote } from "../interfaces";
import { IUser } from "../../../interfaces";
import { getUserDataById } from "../../../utilities";
import CommentCard from "../components/CommentCard";
import { SessionContext } from "../../../contexts/SessionContext";

const DetailForum = () => {
  const session = useContext(SessionContext);
  const newCommentRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>();
  const [author, setAuthor] = useState<IUser | null>();
  const [upvote, setUpvote] = useState<number>(0);
  const [downvote, setDownvote] = useState<number>(0);
  const [isVoted, setIsVoted] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[] | null>([]);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [refreshComment, setRefreshComment] = useState<boolean>(false);

  const fetchPost = async () => {
    const data: IPost = (await getPostById(id)).data;
    setPost(data);
    setUpvote(data.upvote);
    setDownvote(data.downvote);
    fetchAuthor(data.user_id);
    checkVote(data.id);
    const date = new Date(data.updated_at ?? data.created_at);
    const { formattedDate, formattedTime } = getFormattedDateAndTime(date);
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
  };

  const fetchAuthor = async (userId: string | undefined) => {
    const data = await getUserDataById(userId);
    setAuthor(data.data);
  };

  const fetchComments = async () => {
    const data = await getCommentsByPostId(id);
    setComments(data.data);
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dto: IComment = {
      body: newComment,
      post_id: post?.id,
      user_id: session.user?.id,
      created_at: new Date(),
      upvote: 0,
      downvote: 0,
    };
    const data = await addComment(dto);
    if (data.status === 201) {
      alert("Comment added successfully!");
      if (newCommentRef.current) newCommentRef.current.value = "";
      setRefreshComment((prev) => !prev);
    } else {
      alert("Comment failed to add.");
    }
  };

  const checkVote = async (postId: string | undefined) => {
    const data = await checkVoteStatus(session.user, postId, "Post");
    if (data.data && data.data?.length > 0) {
      const vote = data.data[0].type ?? 0;
      setIsVoted(vote === 1 ? "upvote" : "downvote");
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    const dto: IVote = {
      user_id: session.user?.id,
      post_id: post?.id,
      type,
    };
    if (isVoted) {
      if (isVoted === type) {
        const data = await removeVote(dto, "Post", post?.id);
        if (data.dataPost && data.dataVote) {
          if (type === "upvote") {
            setUpvote(upvote - 1);
            setIsVoted("");
          } else {
            setDownvote(downvote - 1);
            setIsVoted("");
          }
        }
      } else {
        const data = await swapVote(dto, isVoted, "Post", post?.id);
        if (data.removeData.dataPost && data.removeData.dataVote) {
          if (isVoted === "upvote") {
            setUpvote(upvote - 1);
            setDownvote(downvote + 1);
            setIsVoted("downvote");
          } else {
            setUpvote(upvote + 1);
            setDownvote(downvote - 1);
            setIsVoted("upvote");
          }
        }
      }
    } else {
      const data = await addVote(dto, "Post", post?.id);
      console.log(data);
      if (data.dataPost && data.dataVote) {
        if (type === "upvote") {
          setUpvote(upvote + 1);
          setIsVoted("upvote");
        } else {
          setDownvote(downvote + 1);
          setIsVoted("downvote");
        }
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [refreshComment]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-screen">
      <div className="relative border rounded-lg p-4 mt-8 w-3/4">
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 border rounded-full"
            src={author?.avatar_url}
            alt={author?.name}
          />
          <span>{author?.name}</span>
          <span className="absolute right-4 top-4 font-bold hover:cursor-pointer">
            ...
          </span>
        </div>
        <h1 className="font-bold text-2xl mt-4">{post?.title}</h1>
        <p>{post?.body}</p>
        <div className="flex items-center gap-12 mt-12">
          <div className="flex gap-4">
            <span
              className={`hover:cursor-pointer ${
                isVoted === "upvote" && "text-green-500"
              }`}
              onClick={() => handleVote("upvote")}
            >
              {upvote} &uarr;
            </span>
            <span
              className={`hover:cursor-pointer ${
                isVoted === "downvote" && "text-red-500"
              }`}
              onClick={() => handleVote("downvote")}
            >
              {downvote} &darr;
            </span>
          </div>
          <div>
            {formattedTime} • {formattedDate}
          </div>
        </div>
      </div>
      <form className="w-3/4 relative" onSubmit={handleAddComment}>
        <input
          ref={newCommentRef}
          className="w-full p-4 border rounded-lg"
          type="text"
          name="comment"
          id="comment"
          placeholder="Tambahkan komentar..."
          onInput={(e) => setNewComment((e.target as HTMLInputElement).value)}
        />
        <input
          type="submit"
          value="&#43;"
          className="absolute right-4 top-4 border-gray-300 border rounded-lg w-8 h-8 text-lg hover:cursor-pointer hover:bg-cus-blue hover:text-white"
        />
      </form>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default DetailForum;
