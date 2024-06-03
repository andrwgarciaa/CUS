import { useContext, useEffect, useState } from "react";
import { IUser } from "../../../interfaces";
import { IComment, IVote } from "../interfaces";
import {
  addVote,
  checkVoteStatus,
  getFormattedDateAndTime,
  removeVote,
  swapVote,
} from "../utilities";
import { getUserDataById } from "../../../utilities";
import { SessionContext } from "../../../contexts/SessionContext";

const CommentCard = (props: IComment) => {
  const session = useContext(SessionContext);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [upvote, setUpvote] = useState<number>(props.upvote);
  const [downvote, setDownvote] = useState<number>(props.downvote);
  const [isVoted, setIsVoted] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");

  const date = new Date(
    props.updated_at
      ? props.updated_at
      : props.created_at
      ? props.created_at
      : new Date().toISOString()
  );

  const fetchAuthor = async () => {
    if (props.user_id) {
      const data = await getUserDataById(props.user_id);
      setAuthor(data.data);
    }
  };

  const checkVote = async () => {
    const data = await checkVoteStatus(session.user, props.id, "Comment");
    if (data.data && data.data?.length > 0) {
      const vote = data.data[0].type ?? 0;
      setIsVoted(vote === 1 ? "upvote" : "downvote");
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    const dto: IVote = {
      user_id: session.user?.id,
      comment_id: props.id,
      type,
    };
    if (isVoted) {
      if (isVoted === type) {
        const data = await removeVote(dto, "Comment", props.id);
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
        const data = await swapVote(dto, isVoted, "Comment", props.id);
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
      const data = await addVote(dto, "Comment", props.id);
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
    fetchAuthor();
    checkVote();
    const { formattedDate, formattedTime } = getFormattedDateAndTime(date);
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
  }, []);

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
        <p className="mt-4">{props.body}</p>
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
    </div>
  );
};

export default CommentCard;
