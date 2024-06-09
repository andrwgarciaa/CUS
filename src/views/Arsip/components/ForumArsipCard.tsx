import { IPost } from "../../Forum/interfaces";
import { truncateString } from "../../../utilities";

const ForumArsipCard = ({ forum }: { forum: IPost }) => {
  return (
    <div className="border rounded-lg p-4 my-4">
      <p className="font-bold">{truncateString(forum.title, 50)}</p>
      <p>{truncateString(forum.body, 100)}</p>
    </div>
  );
};

export default ForumArsipCard;
