import { STATISTIK_NAME } from "../../../constants";
import { IStatistik } from "../interfaces";

const StatistikCard = (props: IStatistik) => {
  return (
    <div className="border rounded-lg shadow-md p-4 text-center uppercase font-medium">
      <h3 className="text-lg">{STATISTIK_NAME[props.title]}</h3>
      <p className="text-2xl">{props.value}</p>
    </div>
  );
};

export default StatistikCard;
