import { useFetch } from "@/hooks/useFetch";
import { type authResponseMessage } from "@/types/messageResponseType";
import React, { useCallback } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const { data, isLoading, isSuccess } = useFetch<authResponseMessage, any>({
    url: "/auth/page",
    method: "POST",
  });
  
  return (
    <>
      {isSuccess && data?.isLogged && <Navigate to={"/dashboard"} />}

      {!data?.isLogged && (
        <main className="w-full h-screen flex justify-center px-6 items-center">
          <Outlet />
        </main>
      )}

      {isLoading && <h1>Loading...</h1>}
    </>
  );
};

export default AuthLayout;
