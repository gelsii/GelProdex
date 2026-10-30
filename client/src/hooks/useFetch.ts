import mainApiServices from "@/services/main.api.services";
import axios, { AxiosError } from "axios";
import React from "react";

type states = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

type actions = {
  type: "setIsLoadingFalse" | "setIsErrorTrue" | "setIsSuccessTrue" | "setData";
};

const stateReducer = (state: states, action: actions) => {
  switch (action.type) {
    case "setIsLoadingFalse":
      return { ...state, isLoading: true };
    case "setIsErrorTrue":
      return { ...state, isError: true };
    case "setIsSuccessTrue":
      return { ...state, isSuccessTrue: true };
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
  onError?: (error: AxiosError) => any;
  onSuccess?: (data: any) => any;
};

export const useFetch = <D, E>({
  dataAxios,
  queries,
  url,
  method,
  startFetch,
  onSuccess,
  onError,
}: useFetchProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    isLoading: true,
    isSuccess: false,
    isError: false,
  });

  const [data, setData] = React.useState<D>();
  const [error, setError] = React.useState<E | string>();

  const fetchAPI = React.useCallback(
    () => async () => {
      try {
        const response = await mainApiServices({
          url,
          method,
          data: dataAxios,
          params: queries,
        });

        dispatch({ type: "setIsSuccessTrue" });
        dispatch({ type: "setIsLoadingFalse" });

        setData(response.data);
        if (onSuccess) onSuccess(response.data);
      } catch (error: any) {
        dispatch({ type: "setIsErrorTrue" });

        if (axios.isAxiosError(error)) setError(error.response?.data.message);
        else setError("Something went wrong. Please try again.");

        if (onError) onError(error);
      }
    },
    [queries, url, dataAxios, method, onError, onSuccess],
  );

  React.useEffect(() => {
    if (startFetch) {
      fetchAPI();
    }
  }, [startFetch, fetchAPI]);

  return { ...state, data, error, fetchAPI };
};
