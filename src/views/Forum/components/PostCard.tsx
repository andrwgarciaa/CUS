import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces";
import { IPost } from "../interfaces";
import { getUserDataById } from "../../../utilities";
import { Link } from "react-router-dom";
import { getFormattedDateAndTime } from "../utilities";

const PostCard = (props: IPost) => {
  const [author, setAuthor] = useState<IUser | null>();
  const [formattedDate, setFormattedDate] = useState<string>("");

  const date = new Date(props.updated_at ? props.updated_at : props.created_at);

  const fetchAuthor = async () => {
    const data = await getUserDataById(props.user_id);
    setAuthor(data.data);
  };

  useEffect(() => {
    fetchAuthor();
    const { formattedDate } = getFormattedDateAndTime(date);
    setFormattedDate(formattedDate);
  }, []);

  return (
    <div className="border p-4 rounded-lg">
      <Link to={`/forum/detail/${props.id}`} className="text-xl font-bold">
        {props.title}
      </Link>
      <p>{props.body}</p>
      <div className="flex justify-between items-center mt-4">
        <span>
          {formattedDate}, oleh{" "}
          <span className="font-semibold">{author?.name}</span>
        </span>
      </div>
      <div className="flex justify-end items-center mt-4">
          <span>{props.upvote} upvotes | {props.downvote} downvotes</span>
      </div>
    </div>
  );
};

export default PostCard;
