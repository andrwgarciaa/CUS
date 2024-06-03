import { useContext, useState } from "react";
import { IPost } from "../../interfaces";
import { SessionContext } from "../../../../contexts/SessionContext";
import { addPost } from "../../utilities";

const AddPost = () => {
  const session = useContext(SessionContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddPost = async (e: any) => {
    e.preventDefault();

    const dto: IPost = {
      title,
      body,
      user_id: session.user?.id,
      created_at: new Date(),
      upvote: 0,
      downvote: 0,
    };
    const data = await addPost(dto);

    if (data.status == 201) alert("Post added successfully!");
    else alert("Post failed to add.");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl">Add Post</h1>
      <form className="mt-4 flex flex-col gap-4" onSubmit={handleAddPost}>
        <div className="mx-auto w-full">
          <div>
            <div className="relative">
              <input
                type="text"
                id="title"
                placeholder=" "
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="title"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Title
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
                className="p-3 peer block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                onInput={(e) => setBody((e.target as HTMLInputElement).value)}
              />
              <label
                htmlFor="body"
                className="peer-focus:base absolute left-2 top-0.5 z-10 -translate-y-3 transform bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-sm peer-focus:-translate-y-3 peer-focus:text-xs peer-disabled:bg-transparent"
              >
                Body
              </label>
            </div>
          </div>
        </div>

        <input type="submit" value={"Submit"} />
      </form>
    </div>
  );
};

export default AddPost;
