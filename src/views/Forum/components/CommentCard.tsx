import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces";
import { IComment } from "../interfaces";
import { getFormattedDateAndTime } from "../utilities";
import { getUserDataById } from "../../../utilities";

const CommentCard = (props: IComment) => {
  const [author, setAuthor] = useState<IUser | null>(null);
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
    const data = await getUserDataById(props.user_id);
    setAuthor(data.data);
  };

  useEffect(() => {
    fetchAuthor();
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
        <div className="flex gap-4 mt-4">
          <div>
            {props.upvote} upvotes | {props.downvote} downvotes
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
