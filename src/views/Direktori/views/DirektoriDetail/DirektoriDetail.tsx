import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPlaces } from "../../../../interfaces";
import { getDirektoriDetailById } from "./utilities";

const DirektoriDetail = () => {
  const [placeData, setPlaceData] = useState<IPlaces | null>();
  const id = useParams().id;

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
