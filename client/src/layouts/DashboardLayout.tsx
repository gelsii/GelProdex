import ErrorFetching from "@/components/dashboard/ErrorFetching";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { tokenContext } from "@/contexts/token";
import { useFetch } from "@/hooks/useFetch";
import type {
  errorMessageResponse,
  tokenResponse,
  userResponseData,
} from "@/types/messageResponseType";
import type { AxiosError } from "axios";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "@/components/dashboard/SideBar";
import { currentUserContext, type User } from "@/contexts/currentUser";

type DashboardAuthenticateProps = {
  children: React.ReactNode;
};

const DashboardTakeUser = ({ children }: DashboardAuthenticateProps) => {
  const token = React.useContext(tokenContext);
  const user = React.useContext(currentUserContext);
  const navigate = useNavigate();

  const { isSuccess, isError, error } = useFetch<
    User,
    AxiosError<errorMessageResponse>
  >({
    url: "/auth/user",
    method: "GET",
    authorization: `Bearer ${token?.userToken}`,
    onSuccess: React.useCallback((res: userResponseData) => {
      user?.setUserData(res.data);
    }, []),
  });

  return (
    <>
      {isSuccess && children}

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
        <DashboardTakeUser>
          <SidebarProvider>
            <DashboardSideBar />

            <SidebarInset>
              <main className="w-full h-full scrollbar-none md:border-r md:border-l">
                <Header />
                <div className="px-10">
                  <Outlet />
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </DashboardTakeUser>
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
