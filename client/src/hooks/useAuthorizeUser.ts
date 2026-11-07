import React from "react";
import { useFetch } from "./useFetch";
import { tokenContext } from "@/contexts/token";
import {
  type messageResponse,
  type errorMessageResponse,
} from "@/types/messageResponseType";

const useAuthorizeUser = () => {
  const token = React.useContext(tokenContext);

  const datas = useFetch<messageResponse, errorMessageResponse>({
    url: "/auth/dashboard",
    method: "POST",
    authorization: `Bearer ${token?.userToken}`,
  });

  return datas;
};

export default useAuthorizeUser;
