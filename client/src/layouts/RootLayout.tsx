import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="w-screen h-screen flex-col-start-center px-[clamp(1rem,12vw,16rem)]">
      <Outlet />
    </main>
  );
};

export default RootLayout;
