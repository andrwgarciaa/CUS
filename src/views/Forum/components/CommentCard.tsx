import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../../../interfaces";
import { IComment, IVote } from "../interfaces";
import {
  addVote,
  checkVoteStatus,
  deleteComment,
  editComment,
  getFormattedDateAndTime,
  removeVote,
  swapVote,
} from "../utilities";
import { getUserDataById } from "../../../utilities";
import { SessionContext } from "../../../contexts/SessionContext";
import { Link } from "react-router-dom";
import { AVATAR_URL } from "../../../constants";

const CommentCard = ({
  comment,
  setRefreshComment,
}: {
  comment: IComment;
  setRefreshComment: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useContext(SessionContext);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [upvote, setUpvote] = useState<number>(comment.upvote);
  const [downvote, setDownvote] = useState<number>(comment.downvote);
  const [isVoted, setIsVoted] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const date = new Date(
    comment.updated_at
      ? comment.updated_at
      : comment.created_at
      ? comment.created_at
      : new Date().toISOString()
  );

  const fetchAuthor = async () => {
    if (comment.user_id) {
      const data = await getUserDataById(comment.user_id);
      setAuthor(data.data);
      console.log(data.data);
    }
  };

  const checkVote = async () => {
    const data = await checkVoteStatus(session.user, comment.id, "Comment");
    if (data.data && data.data?.length > 0) {
      const vote = data.data[0].type ?? 0;
      setIsVoted(vote === 1 ? "upvote" : "downvote");
    }
  };

  const handleVote = async (type: "upvote" | "downvote") => {
    if (!session.user) {
      alert("Anda harus masuk terlebih dahulu.");
      return;
    }

    const dto: IVote = {
      user_id: session.user?.id,
      comment_id: comment.id,
      type,
    };
    if (isVoted) {
      if (isVoted === type) {
        const data = await removeVote(dto, "Comment");
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
        const data = await swapVote(dto, isVoted, "Comment");
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
      const data = await addVote(dto, "Comment");
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

  const handlePostSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleEditComment = async (e: any) => {
    e.preventDefault();

    if (newComment === "") {
      alert("Komentar tidak boleh kosong!");
      return;
    }

    if (newComment === comment.body) {
      alert("Tidak ada perubahan yang dilakukan.");
      return;
    }

    const dto: IComment = {
      ...comment,
      body: newComment,
      updated_at: new Date(),
    };
    const data = await editComment(dto);

    if (data.status === 204) {
      alert("Komentar berhasil disunting");
      setEditMode((prev) => !prev);
      setRefreshComment((prev) => !prev);
    } else {
      alert("Komentar gagal disunting");
    }
  };

  const handleDeleteComment = async () => {
    const data = await deleteComment(comment?.id);
    if (data.status === 204) {
      alert("Komentar berhasil dihapus");
      setRefreshComment((prev) => !prev);
    } else {
      alert("Komentar gagal dihapus");
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
        <div>
          <Link
            to={`/profil/${author?.name}`}
            className="flex gap-2 items-center w-max"
          >
            <img
              className="w-8 h-8 border rounded-full object-cover"
              src={AVATAR_URL + (author?.has_photo ? author?.id : "blank")}
              alt={author?.name}
            />
            <span>{author?.name}</span>
          </Link>
          <span
            className="absolute right-4 top-4 font-bold hover:cursor-pointer"
            onClick={handlePostSettings}
          >
            ...
          </span>
        </div>
        {showSettings && (
          <div className="absolute w-32 right-4 top-12 bg-white border rounded-lg p-4 flex flex-col gap-1 z-10 text-center">
            {session.user && session.user?.id === comment.user_id && (
              <>
                <p
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setEditMode((prev) => !prev);
                    handlePostSettings();
                  }}
                >
                  Sunting
                </p>
                <p
                  className="hover:cursor-pointer"
                  onClick={handleDeleteComment}
                >
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
        {editMode ? (
          <form
            className="relative w-full h-[100px]"
            onSubmit={handleEditComment}
          >
            <textarea
              className="w-full h-full p-4 mt-4 border rounded-lg mb-3 pr-32 word-wrap break-words resize-none"
              defaultValue={comment.body}
              onInput={(e) =>
                setNewComment((e.target as HTMLInputElement).value)
              }
            />
            <input
              type="submit"
              className="absolute right-4 bottom-0 border border-cus-orange bg-cus-orange text-white hover:cursor-pointer hover:bg-white hover:text-cus-orange w-30 rounded-lg p-2"
              value="Simpan"
            />
          </form>
        ) : (
          <p className="mt-4">{comment.body}</p>
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
