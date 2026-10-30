import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="w-full h-full flex-col-start-center">
      <Outlet />
    </main>
  );
};

export default RootLayout;
