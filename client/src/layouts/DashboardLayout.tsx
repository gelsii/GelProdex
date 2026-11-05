import Header from "@/components/dashboard/Header";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { isLoading, isError, isSuccess } = useFetch({
    url: "/auth/dashboard",
    method: "POST",
  });
  return (
    <>
      {isSuccess && (
        <main className="w-full h-full md:border-r md:border-l">
          <Header />
          <div className="w-full h-full px-[clamp(1.2rem,6vw,12rem)]">
            <Outlet />
          </div>
        </main>
      )}

      {isLoading && <h1>Loading... Please wait.</h1>}

      { isError && <h1>Something went wrong.</h1>}
    </>
  );
};

export default DashboardLayout;
