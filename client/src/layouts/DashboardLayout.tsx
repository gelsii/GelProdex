import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router";

const DashboardLayout = () => {
  const navigate = useNavigate();

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

      {isError && (
        <div>
          <p>Please login first.</p>
          <Button onClick={() => navigate("/auth/signin", { replace: true })}>
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
