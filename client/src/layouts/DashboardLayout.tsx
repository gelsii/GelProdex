import Header from "@/components/dashboard/Header";
import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <main className="w-full h-full md:border-r md:border-l">
      <Header />
      <div className="w-full h-full px-[clamp(1.2rem,6vw,12rem)]">
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
