import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../../../interfaces";
import { IPost, IVote } from "../interfaces";
import { getUserDataById } from "../../../utilities";
import { Link, useNavigate } from "react-router-dom";
import {
  addVote,
  checkVoteStatus,
  deletePost,
  getCommentsByPostId,
  getFormattedDateAndTime,
  removeVote,
  swapVote,
} from "../utilities";
import { SessionContext } from "../../../contexts/SessionContext";

const PostCard = ({
  post,
  setRefresh,
}: {
  post: IPost;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useContext(SessionContext);
  const [author, setAuthor] = useState<IUser | null>();
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [upvote, setUpvote] = useState<number>(post.upvote);
  const [downvote, setDownvote] = useState<number>(post.downvote);
  const [comments, setComments] = useState<number>(post.comments ?? 0);
  const [isVoted, setIsVoted] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const date = new Date(post.updated_at ? post.updated_at : post.created_at);

  const fetchAuthor = async () => {
    const data = await getUserDataById(post.user_id);
    setAuthor(data.data);
  };

  const fetchCommentsCount = async () => {
    const data = await getCommentsByPostId(post.id);
    if (data.data) setComments(data.data.length);
  };

  const checkVote = async () => {
    const data = await checkVoteStatus(session.user, post.id, "Post");
    if (data.data && data.data?.length > 0) {
      const vote = data.data[0].type ?? 0;
      setIsVoted(vote === 1 ? "upvote" : "downvote");
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    const dto: IVote = {
      user_id: session.user?.id,
      post_id: post.id,
      type,
    };
    if (isVoted) {
      if (isVoted === type) {
        const data = await removeVote(dto, "Post");
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
        const data = await swapVote(dto, isVoted, "Post");
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
      const data = await addVote(dto, "Post");
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

  const handlePostSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleDeletePost = async () => {
    const data = await deletePost(post.id);
    if (data.status === 204) {
      alert("Post berhasil dihapus");
      setRefresh((prev) => !prev);
    } else {
      alert("Post gagal dihapus");
    }
  };

  useEffect(() => {
    fetchAuthor();
    checkVote();
    fetchCommentsCount();
    const { formattedDate } = getFormattedDateAndTime(date);
    setFormattedDate(formattedDate);
  }, []);

  return (
    <div className="relative border p-4 rounded-lg">
      <Link to={`/forum/detail/${post.id}`} className="text-xl font-bold">
        {post.title}
      </Link>
      <p>{post.body}</p>
      <span
        className="absolute right-4 top-4 font-bold hover:cursor-pointer"
        onClick={handlePostSettings}
      >
        ...
      </span>
      {showSettings && (
        <div className="absolute w-32 right-4 top-12 bg-white border rounded-lg p-4 flex flex-col gap-1 z-10 text-center">
          {session.user && session.user?.id === post.user_id && (
            <>
              <Link to={`/forum/edit/${post.id}`}>Sunting</Link>
              <p className="hover:cursor-pointer" onClick={handleDeletePost}>
                Hapus
              </p>
            </>
          )}
          <p
            className="hover:cursor-pointer"
            onClick={() => {
              alert("hanya dummy");
            }}
          >
            Laporkan
          </p>
        </div>
      )}
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
          <Link
            to={`/forum/detail/${post.id}`}
            className="hover:cursor-pointer"
          >
            {comments} &#128488;
          </Link>
        </div>
        <span>
          {formattedDate} oleh{" "}
          <Link to={`/profil/${author?.name}`} className="font-semibold">
            {author?.name}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PostCard;
