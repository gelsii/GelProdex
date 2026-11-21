import React from "react";
import { tokenContext, type tokenType } from "@/contexts/token";
import { currentUserContext, type User } from "@/contexts/currentUser";
import refetchDataContext from "@/contexts/refetchData";
type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [userToken, setUserToken] = React.useState<string | null>(null);
  const [userData, setUserData] = React.useState<User | null>(null);
  const [refetchData, setRefetchData] = React.useState(false);

  return (
    <tokenContext.Provider value={{ userToken, setUserToken }}>
      <currentUserContext.Provider value={{ userData, setUserData }}>
        <refetchDataContext.Provider value={{ refetchData, setRefetchData }}>
          {children}
        </refetchDataContext.Provider>
      </currentUserContext.Provider>
    </tokenContext.Provider>
  );
};

export default ContextProvider;
