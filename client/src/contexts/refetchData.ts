import { createContext } from "react";

type refetchType = {
  refetchData: boolean;
  setRefetchData: React.Dispatch<React.SetStateAction<boolean>>;
};

const refetchDataContext = createContext<refetchType | null>(null);

export default refetchDataContext;
