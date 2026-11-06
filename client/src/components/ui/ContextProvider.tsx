import React from "react";
import { tokenContext, type tokenType } from "@/contexts/token";

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [userToken, setUserToken] = React.useState<string | null>(null);

  return (
    <tokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </tokenContext.Provider>
  );
};

export default ContextProvider;
