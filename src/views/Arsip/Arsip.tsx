import ArsipSection from "./components/ArsipSection";

const Arsip = () => {
  const archiveTypes = ["Forum", "Direktori", "Komunitas"];
  return (
    <div className="w-screen flex flex-col lg:flex-row justify-around gap-8 p-8 h-[90vh]">
      {archiveTypes.map((type) => (
        <ArsipSection key={type} type={type} />
      ))}
    </div>
  );
};

export default Arsip;
