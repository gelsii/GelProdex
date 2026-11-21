import { LayoutDashboard } from "lucide-react";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  return (
    <header className="w-full h-18 sticky z-31 backdrop-blur-md top-0 left-0 flex justify-start items-center shadow-2xl">
      <div className="w-full h-full  items-center flex ">
        <div className="p-4 mr-4 border-r-2">
          <SidebarTrigger />
        </div>

        <h1 className="flex gap-2 items-center font-bold text-lg text-lightBlue">
          <LayoutDashboard />
          Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
