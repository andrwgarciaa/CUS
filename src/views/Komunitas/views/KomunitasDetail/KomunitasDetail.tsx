import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommunityActivityById } from "../../utilities";
import { ICommunityActivity } from "../../interfaces";

const KomunitasDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<ICommunityActivity>();

  const fetchData = async () => {
    const data = await getCommunityActivityById(id);
    if (data.data) setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
};

export default KomunitasDetail;
