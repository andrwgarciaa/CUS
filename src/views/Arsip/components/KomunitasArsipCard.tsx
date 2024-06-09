import { ICommunityActivity } from "../../../interfaces";

const KomunitasArsipCard = ({
  komunitas,
}: {
  komunitas: ICommunityActivity;
}) => {
  return (
    <div className="flex flex-col border rounded-lg p-4 h-max">
      <p className="text-3xl">{komunitas.name}</p>
      <p>{komunitas.description}</p>
    </div>
  );
};

export default KomunitasArsipCard;
