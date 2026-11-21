import { createContext } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
};

type UserContext = {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
};

export const currentUserContext = createContext<UserContext | null>(null);
