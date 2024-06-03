import { useParams } from "react-router-dom";
import {
  addComment,
  getCommentsByPostId,
  getFormattedDateAndTime,
  getPostById,
} from "../utilities";
import { useContext, useEffect, useRef, useState } from "react";
import { IComment, IPost } from "../interfaces";
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
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[] | null>([]);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [refreshComment, setRefreshComment] = useState<boolean>(false);

  const date = new Date(
    post?.updated_at
      ? post.updated_at
      : post?.created_at
      ? post.created_at
      : new Date().toISOString()
  );

  const fetchPost = async () => {
    const data = await getPostById(id);
    setPost(data.data);
  };

  const fetchAuthor = async () => {
    const data = await getUserDataById(post?.user_id);
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

  useEffect(() => {
    fetchPost();
    fetchAuthor();
    const { formattedDate, formattedTime } = getFormattedDateAndTime(date);
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
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
        <div className="flex gap-4 mt-4">
          <div>
            {post?.upvote} upvotes | {post?.downvote} downvotes
          </div>
          <div>
            {formattedTime} • {formattedDate}
          </div>
        </div>
      </div>
      <form className="w-3/4 " onSubmit={handleAddComment}>
        <input
          ref={newCommentRef}
          className="w-full p-4 border rounded-lg mb-3"
          type="text"
          name="comment"
          id="comment"
          placeholder="Tambahkan komentar..."
          onInput={(e) => setNewComment((e.target as HTMLInputElement).value)}
        />
        <input type="submit" className="border border-cus-orange bg-cus-orange text-white hover:cursor-pointer hover:bg-white hover:text-cus-orange w-30 rounded-lg p-2" value="Tambahkan" />
      </form>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default DetailForum;
