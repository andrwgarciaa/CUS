import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPost } from "./interfaces";
import { getAllPosts, getCommentsByPostId } from "./utilities";
import PostCard from "./components/PostCard";
import LoadingWithMessage from "../../components/LoadingWithMessage";

const Forum = () => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [filter, setFilter] = useState<string>("1");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async (filter: string) => {
    const data = await getAllPosts();
    let filtered: IPost[] = [];
    if (data.data) {
      filtered = data.data;
      if (filter === "1") {
        filtered.sort((a: IPost, b: IPost) => {
          return (
            new Date(b.updated_at ?? b.created_at).getTime() -
            new Date(a.updated_at ?? a.created_at).getTime()
          );
        });
      } else if (filter === "2") {
        const postsWithCommentCounts = await Promise.all(
          filtered.map(async (post: IPost) => {
            const comments = await getCommentsByPostId(post.id);
            return { ...post, comments: comments.data?.length ?? 0 };
          })
        );

        filtered = postsWithCommentCounts.sort((a: IPost, b: IPost) => {
          console.log(a.title, a.comments, b.title, b.comments);
          return (b.comments ?? 0) - (a.comments ?? 0);
        });
      } else if (filter === "3") {
        filtered.sort((a: IPost, b: IPost) => {
          const aScore = a.upvote - a.downvote;
          const bScore = b.upvote - b.downvote;

          if (aScore === bScore) {
            if (a.upvote !== b.upvote) {
              return b.upvote - a.upvote;
            }

            if (a.downvote !== b.downvote) {
              return a.downvote - b.downvote;
            }

            return (
              new Date(b.updated_at ?? b.created_at).getTime() -
              new Date(a.updated_at ?? a.created_at).getTime()
            );
          }

          return bScore - aScore;
        });
      }
    }
    setPosts(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(filter);
  }, [filter, refresh]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Forum</h1>
      <div className="flex justify-between items-center">
        <div>
          <span>Urutkan dari: </span>
          <select
            className="hover:cursor-pointer border rounded-lg p-2 bg-white border-cus-orange"
            defaultValue={1}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value={1}>Terbaru</option>
            <option value={2}>Terpopuler</option>
            <option value={3}>Paling disukai</option>
          </select>
        </div>
        <Link
          to={"/forum/add-post"}
          className="border rounded-lg p-2 bg-white text-cus-orange border-cus-orange hover:bg-cus-orange hover:text-white"
        >
          Tambahkan Post Baru
        </Link>
      </div>
      {!loading ? (
        <div className="flex flex-col gap-2 mt-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} setRefresh={setRefresh} />
          ))}
        </div>
      ) : (
        <LoadingWithMessage />
      )}
    </div>
  );
};

export default Forum;
