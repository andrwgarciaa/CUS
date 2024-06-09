import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import { getArchiveByType } from "../utilities";
import ForumArsipCard from "./ForumArsipCard";
import DirektoriArsipCard from "./DirektoriArsipCard";
import KomunitasArsipCard from "./KomunitasArsipCard";

const ArsipSection = (props: any) => {
  const session = useContext(SessionContext);
  const [data, setData] = useState<any[] | null>([]);

  const fetchData = async (userId: string | undefined, type: string) => {
    const forumData = await getArchiveByType(userId, type);
    if (forumData) setData(forumData.data);
  };

  useEffect(() => {
    if (session.user) fetchData(session.user?.id, props.type);
  }, [session.user]);

  return (
    <div className="border rounded-lg p-4 h-max flex-1">
      <p className="text-3xl mb-4">{props.type}</p>
      <hr className="m-4" />
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {data?.map((item: any) => {
          if (props.type === "Forum") {
            return <ForumArsipCard key={item.id} forum={item} />;
          } else if (props.type === "Direktori") {
            return <DirektoriArsipCard key={item.id} place={item} />;
          } else {
            return <KomunitasArsipCard key={item.id} komunitas={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default ArsipSection;
