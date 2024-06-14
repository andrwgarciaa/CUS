import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../utilities";
import { IPost } from "../../interfaces";
import { SessionContext } from "../../../../contexts/SessionContext";
import PageNotFound from "../../../PageNotFound/PageNotFound";

const EditPost = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchPost = async () => {
    const data = await getPostById(id);

    setPost(data.data);
    setTitle(data.data.title);
    setBody(data.data.body);
  };

  const handleEditPost = async (e: any) => {
    e.preventDefault();

    if (!session.user) {
      alert("Anda harus masuk terlebih dahulu!");
      return;
    }
    if (title === "" || body === "") {
      alert("Judul dan isi tidak boleh kosong!");
      return;
    }

    if (title === post?.title && body === post?.body) {
      alert("Tidak ada perubahan yang dilakukan.");
      return;
    }

    const dto: IPost = {
      id: post?.id,
      title,
      body,
      user_id: session.user?.id,
      created_at: post?.created_at ? new Date(post.created_at) : new Date(),
      updated_at: new Date(),
      upvote: post?.upvote ?? 0,
      downvote: post?.downvote ?? 0,
    };
    const data = await editPost(dto);

    if (data.status == 204) {
      alert("Berhasil menyunting post!");
      navigate("/forum");
    } else alert("Gagal menyunting post.");
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {session && session.user?.id === post?.user_id ? (
        <div className="p-4">
          <h1 className="text-3xl font-bold">Sunting Post</h1>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleEditPost}>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    placeholder=" "
                    defaultValue={post?.title}
                    className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setTitle((e.target as HTMLInputElement).value)
                    }
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Judul
                  </label>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div>
                <div className="relative">
                  <textarea
                    id="body"
                    placeholder=" "
                    defaultValue={post?.body}
                    className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    onInput={(e) =>
                      setBody((e.target as HTMLInputElement).value)
                    }
                  />
                  <label
                    htmlFor="body"
                    className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
                  >
                    Isi
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              className="border border-cus-orange bg-cus-orange w-20 rounded-lg py-1 text-white hover:border-cus-orange hover:bg-white hover:text-cus-orange hover:cursor-pointer"
              value={"Simpan"}
            />
          </form>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default EditPost;
