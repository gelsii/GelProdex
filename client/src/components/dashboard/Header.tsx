import { LayoutDashboard, Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const navs = [
  {
    name: "Products",
    url: "products",
  },
  {
    name: "Add Products",
    url: "products",
  },
];

const Header = () => {
  return (
    <header className="w-full h-18 sticky z-31 backdrop-blur-md top-0 left-0 flex justify-start items-center shadow-2xl">
      <div className="w-full h-full flex justify-between items-center px-[clamp(1.2rem,6vw,12rem)]">
        <h1 className="flex gap-2 items-center font-bold text-lg text-lightBlue">
          <LayoutDashboard />
          Dashboard
        </h1>

        <nav>
          <ul className="flex gap-8 ">
            {navs.map((nav, index) => (
              <li key={index} className="cursor-default font-heading transition-all duration-300 hover:text-lightBlue">{nav.name}</li>
            ))}
          </ul>
        </nav>

        <Button className={"hidden gap-2 button-bg-lightBlue sm:flex"}>
          <Settings />
          Settings
        </Button>
      </div>
    </header>
  );
};

export default Header;
