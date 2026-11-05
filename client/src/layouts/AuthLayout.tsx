import { useFetch } from "@/hooks/useFetch";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <main className="w-full h-screen flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
