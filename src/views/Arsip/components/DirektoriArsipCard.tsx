import { IPlace } from "../../../interfaces";

const DirektoriArsipCard = ({ place }: { place: IPlace }) => {
  return (
    <div className="flex flex-col border rounded-lg p-4 h-max">
      <p className="text-3xl">{place.name}</p>
      <p>{place.address}</p>
    </div>
  );
};

export default DirektoriArsipCard;
