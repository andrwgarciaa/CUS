export const Spinner = () => {
  return (
    <div className="flex justify-center items-center m-8">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cus-blue border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
};

export default Spinner;
