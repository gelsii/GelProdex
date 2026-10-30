import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
