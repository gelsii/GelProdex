import ErrorFetching from "@/components/dashboard/ErrorFetching";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { tokenContext } from "@/contexts/token";
import { useFetch } from "@/hooks/useFetch";
import type {
  errorMessageResponse,
  tokenResponse,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import React from "react";
import { data, Outlet, useNavigate } from "react-router";

type DashboardAuthenticateProps = {
  children: React.ReactNode;
};

const DashboardAuthenticate = ({ children }: DashboardAuthenticateProps) => {
  const { isSuccess, isError } = useFetch({
    url: "/auth/dashboard",
    method: "POST",
  });

  return (
    <>
      {isSuccess && children}

      {isError && <h1>Errr</h1>}
    </>
  );
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = React.useContext(tokenContext);

  const { isLoading, isError, isSuccess, error } = useFetch<
    tokenResponse,
    AxiosError<errorMessageResponse>
  >({
    url: "/auth/token",
    method: "GET",
    onSuccess: React.useCallback(
      (data: tokenResponse) => {
        token?.setUserToken(data.access_token);
      },
      [token],
    ),
  });

  return (
    <>
      {isSuccess && (
        <DashboardAuthenticate>
          <main className="w-full h-full md:border-r md:border-l">
            <Header />
            <div className="w-full h-full px-[clamp(1.2rem,6vw,12rem)]">
              <Outlet />
            </div>
          </main>
        </DashboardAuthenticate>
      )}

      {isLoading && <h1>Loading... Please wait.</h1>}

      {isError && (
        <ErrorFetching
          description={error?.response?.data.detail}
          title={`${error?.response?.status} - ${error?.response?.statusText}`}
          buttons={
            <Button
              className={"w-38"}
              variant={"secondary"}
              onClick={() => navigate("/auth/signin", { replace: true })}
            >
              Login
            </Button>
          }
        />
      )}
    </>
  );
};

export default DashboardLayout;
