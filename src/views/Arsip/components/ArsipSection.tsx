import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import { getArchiveByType } from "../utilities";
import DirektoriCard from "../../../components/DirektoriCard";
import KomunitasCard from "../../Komunitas/components/KomunitasCard";
import PostCard from "../../Forum/components/PostCard";

const ArsipSection = (props: any) => {
  const session = useContext(SessionContext);
  const [data, setData] = useState<any[] | null>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchData = async (userId: string | undefined, type: string) => {
    const forumData = await getArchiveByType(userId, type);
    if (forumData) setData(forumData.data);
  };

  useEffect(() => {
    if (session.user) fetchData(session.user?.id, props.type);
  }, [session.user]);

  return (
    <div className="p-4 h-max flex-1">
      <p className="text-3xl mb-4">{props.type}</p>
      <div
        className={`flex ${
          props.type === "Forum" ? "flex-col" : ""
        } gap-4 overflow-auto max-h-[70vh]`}
      >
        {data?.map((item: any) => {
          if (props.type === "Forum") {
            return (
              <div className="max-w-1/2">
                <PostCard key={item.id} post={item} setRefresh={setRefresh} />
              </div>
            );
          } else if (props.type === "Direktori") {
            return <DirektoriCard key={item.id} props={item} />;
          } else {
            return <KomunitasCard key={item.id} item={item} />;
          }
        })}
      </div>
    </div>
  );
};

export default ArsipSection;
