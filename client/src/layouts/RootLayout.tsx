import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="w-screen h-screen flex-col-start-center overflow-x-hidden scrollbar-thin">
      <Outlet />
    </main>
  );
};

export default RootLayout;
