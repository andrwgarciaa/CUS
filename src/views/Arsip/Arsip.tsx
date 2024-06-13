import ArsipSection from "./components/ArsipSection";

const Arsip = () => {
  return (
    <div className="w-screen grid grid-cols-3 gap-8 p-8 h-[90vh]">
      <div className="col-span-2 flex flex-col">
        <ArsipSection type={"Direktori"} />
        <ArsipSection type={"Komunitas"} />
      </div>
      <div>
        <ArsipSection type={"Forum"} />
      </div>
    </div>
  );
};

export default Arsip;
