import { tokenContext } from "@/contexts/token";
import mainApiServices from "@/services/main.api.services";
import axios from "axios";
import React from "react";

type states = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

type actions = {
  type:
    | "setIsLoadingFalse"
    | "setIsErrorTrue"
    | "setIsSuccessTrue"
    | "setData"
    | "setIsLoadingTrue";
};

const stateReducer = (state: states, action: actions) => {
  switch (action.type) {
    case "setIsLoadingFalse":
      return { ...state, isLoading: false };
    case "setIsErrorTrue":
      return { ...state, isError: true };
    case "setIsSuccessTrue":
      return { ...state, isSuccess: true };
    case "setIsLoadingTrue":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

type useFetchProps = {
  dataAxios?: any;
  queries?: string | object;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  startFetch?: boolean;
  onError?: (error: any) => any;
  onSuccess?: (data: any) => any;
  authData?: {
    username: string;
    password: string;
  };
};

export const useFetch = <D, E>({
  dataAxios,
  queries,
  url,
  method,
  onSuccess,
  onError,
}: useFetchProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const [data, setData] = React.useState<D>();
  const [error, setError] = React.useState<E>();

  const token = React.useContext(tokenContext);

  React.useEffect(() => {
    dispatch({ type: "setIsLoadingTrue" });

    const fetchAPI = async () => {
      try {
        const response = await mainApiServices({
          url,
          method,
          data: dataAxios,
          params: queries,
          headers: {
            Authorization: `Bearer ${token?.userToken}`,
          },
        });

        dispatch({ type: "setIsSuccessTrue" });
        dispatch({ type: "setIsLoadingFalse" });

        setData(response.data);
        if (onSuccess) onSuccess(response.data);
      } catch (error: any) {
        dispatch({ type: "setIsErrorTrue" });
        dispatch({ type: "setIsLoadingFalse" })

        // if (axios.isAxiosError(error)) {

        //   if(error.name) setError(error.code);
        // }
        // else setError("Something went wrong. Please try again.");

        setError(error)

        if (onError) onError(error);
      }
    };

    fetchAPI();
  }, [queries, url, dataAxios, method, onError, onSuccess, token]);

  return { ...state, data, error };
};

export const useOnFetch = <D, E>({
  dataAxios,
  queries,
  url,
  method,
  onSuccess,
  onError,
  authData,
}: useFetchProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const [data, setData] = React.useState<D>();
  const [error, setError] = React.useState<E | string>();

  const token = React.useContext(tokenContext);

  const fetchAPI = React.useCallback(async () => {
    dispatch({ type: "setIsLoadingTrue" });

    try {
      const response = await mainApiServices({
        url,
        method,
        data: dataAxios,
        params: queries,
        auth: authData,
        headers: {
          Authorization: `Bearer ${token?.userToken}`,
        },
      });

      dispatch({ type: "setIsSuccessTrue" });
      dispatch({ type: "setIsLoadingFalse" });

      setData(response.data);
      if (onSuccess) onSuccess(response.data);
    } catch (error: any) {
      dispatch({ type: "setIsErrorTrue" });
      dispatch({ type: "setIsLoadingFalse" });

      if (axios.isAxiosError(error)) setError(error.response?.data);
      else setError("Something went wrong. Please try again.");

      if (onError) onError(error);
    }
  }, [queries, url, dataAxios, method, onError, onSuccess, authData]);

  return { ...state, data, error, fetchAPI };
};
