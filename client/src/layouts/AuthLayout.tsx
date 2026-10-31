import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
