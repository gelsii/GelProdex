import { createContext } from "react";

export type tokenType = {
    userToken: string | null,
    setUserToken: React.Dispatch<React.SetStateAction<string | null>>
}

export const tokenContext = createContext<tokenType | null>(null)
