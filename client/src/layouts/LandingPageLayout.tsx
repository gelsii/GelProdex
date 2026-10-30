import FooterLandingPage from "@/components/landingPage/FooterLandingPage";
import HeaderLandingPage from "@/components/landingPage/HeaderLandingPage";
import React from "react";
import { Outlet } from "react-router";

const LandingPageLayout = () => {
  return (
    <main className="w-full h-full py-8 to px-4 sm:px-18">
      <HeaderLandingPage />
      <Outlet />
      <FooterLandingPage />
    </main>
  );
};

export default LandingPageLayout;
