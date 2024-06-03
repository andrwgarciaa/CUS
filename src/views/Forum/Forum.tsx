import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPost } from "./interfaces";
import { getAllPosts } from "./utilities";
import PostCard from "./components/PostCard";

const Forum = () => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>([]);
  const [filter, setFilter] = useState<string>("1");

  const fetchPosts = async (filter: string) => {
    const data = await getAllPosts();
    if (filter === "1") {
      data.data?.sort((a: IPost, b: IPost) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    } else {
      data.data?.sort((a: IPost, b: IPost) => {
        return b.upvote - a.upvote;
      });
    }
    setPosts(data.data);
  };

  useEffect(() => {
    fetchPosts(filter);
  }, [filter]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Forum</h1>
      <div className="flex justify-between items-center">
        <div>
          <span>Urutkan dari: </span>
          <select
            className="hover:cursor-pointer"
            value={1}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value={1}>Terbaru</option>
            <option value={2}>Terpopuler</option>
          </select>
        </div>
        <Link
          to={"/forum/add-post"}
          className="border rounded-lg p-2 bg-white text-cus-orange border-cus-orange hover:bg-cus-orange hover:text-white"
        >
          Tambahkan Post Baru
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {posts?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
