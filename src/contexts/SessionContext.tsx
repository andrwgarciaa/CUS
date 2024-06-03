import React, { createContext, useState } from "react";
import { ISessionContext, IUser } from "../interfaces";

export const SessionContext = createContext<ISessionContext>({
  user: null,
  isLoggedIn: false,
  setSession: () => {},
  removeSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setSession = (keepLoggedIn: boolean, dto: IUser) => {
    setUser(dto);
    if (keepLoggedIn) {
      localStorage.setItem("user", JSON.stringify(dto));
    } else {
      sessionStorage.setItem("user", JSON.stringify(dto));
    }
    setIsLoggedIn(true);
  };

  const removeSession = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <SessionContext.Provider
      value={{ user, isLoggedIn, setSession, removeSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};
