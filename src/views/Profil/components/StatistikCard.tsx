import { IStatistik } from "../interfaces";

const StatistikCard = (props: IStatistik) => {
  const STATISTIK_NAME: { [key: string]: string } = {
    totalPost: "Forum dibuat",
    totalComment: "Komentar diberikan",
    totalUpvote: "Upvote diterima",
    totalDownvote: "Downvote diterima",
    totalActivitiesCreated: "Aktivitas dibuat",
    totalActivitiesJoined: "Aktivitas diikuti",
  };

  return (
    <div className="border rounded-lg shadow-md p-4 text-center uppercase font-medium">
      <h3 className="text-lg">{STATISTIK_NAME[props.title]}</h3>
      <p className="text-2xl">{props.value}</p>
    </div>
  );
};

export default StatistikCard;
