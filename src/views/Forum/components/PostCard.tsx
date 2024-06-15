import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../../../interfaces";
import { IPost, IVote } from "../interfaces";
import { checkAdmin, getUserDataById } from "../../../utilities";
import { Link } from "react-router-dom";
import {
  addVote,
  archivePost,
  checkPostArchiveStatus,
  checkVoteStatus,
  deletePost,
  getCommentsByPostId,
  getFormattedDateAndTime,
  removeVote,
  swapVote,
  unarchivePost,
} from "../utilities";
import { SessionContext } from "../../../contexts/SessionContext";
import CommentIcon from "../../../components/CommentIcon";
import ArchiveIcon from "../../../components/ArchiveIcon";

const PostCard = ({
  post,
  setRefresh,
}: {
  post: IPost;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useContext(SessionContext);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  const [author, setAuthor] = useState<IUser | null>();
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [upvote, setUpvote] = useState<number>(post.upvote);
  const [downvote, setDownvote] = useState<number>(post.downvote);
  const [comments, setComments] = useState<number>(post.comments ?? 0);
  const [isVoted, setIsVoted] = useState<string>("");
  const [isArchived, setIsArchived] = useState<boolean>(false);
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
    if (!session.user) {
      alert("Anda harus masuk terlebih dahulu");
      return;
    }

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

  const handleArchivePost = async () => {
    if (isArchived) {
      const data = await unarchivePost(session.user?.id, post.id);
      if (data.status === 204) {
        setIsArchived(false);
      } else {
        alert("Post gagal dihapus dari arsip");
      }
    } else {
      const data = await archivePost(session.user?.id, post.id);
      if (data.status === 201) {
        setIsArchived(true);
      } else {
        alert("Post gagal diarsipkan");
      }
    }
  };

  const checkArchive = async () => {
    const data = await checkPostArchiveStatus(session.user?.id, post.id);
    if (data) setIsArchived(true);
  };

  useEffect(() => {
    setIsAdmin(checkAdmin(session.user));
    fetchAuthor();
    checkVote();
    checkArchive();
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
          {session.user && (session.user?.id === post.user_id || isAdmin) && (
            <>
              <Link className="" to={`/forum/edit/${post.id}`}>
                Sunting
              </Link>
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
      <div className="flex justify-between items-center w-full gap-12 mt-12">
        <span>
          {formattedDate} oleh{" "}
          <Link to={`/profil/${author?.name}`} className="font-semibold">
            {author?.name}
          </Link>
        </span>
        <div className="flex gap-2">
          <Link
            to={`/forum/detail/${post.id}`}
            className="hover:cursor-pointer flex items-center gap-1 mr-3"
          >
            <p>{comments}</p> <CommentIcon />
          </Link>
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
          <span
            className="flex items-center ml-3 hover:cursor-pointer"
            onClick={handleArchivePost}
          >
            <ArchiveIcon archived={isArchived} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
