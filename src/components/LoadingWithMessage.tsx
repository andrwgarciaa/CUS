import { useEffect, useState } from "react";

const LoadingWithMessage = () => {
  const loadingMessages = [
    "Mohon tunggu...",
    "Sedang memuat...",
    "Melengkapi data...",
    "Mengambil foto...",
  ];
  const [randomMessage, setRandomMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setRandomMessage(loadingMessages[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 m-8">
      <p className="text-bold text-2xl">{randomMessage}</p>
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cus-blue border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
};

export default LoadingWithMessage;
