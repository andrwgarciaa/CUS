import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlace } from "../../../../interfaces";
import { getDirektoriDetailById } from "./utilities";

const DirektoriDetail = () => {
  const [placeData, setPlaceData] = useState<IPlace | null>();
  const { id } = useParams();

  const getPlaceData = async (id: string | undefined) => {
    const data = await getDirektoriDetailById(id);
    setPlaceData(data);
  };

  useEffect(() => {
    getPlaceData(id);
  }, []);
  return (
    <div>
      <h1>{placeData?.name}</h1>
    </div>
  );
};

export default DirektoriDetail;
