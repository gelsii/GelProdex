import React from "react";
import { Button } from "./button";
import { NavLink, useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Handbag, Home, Menu } from "lucide-react";

const ButtonsHeader = React.memo(
  ({
    className,
    styleButton,
  }: {
    className?: string;
    styleButton?: string;
  }) => {
    const navigate = useNavigate();

    return (
      <div className={`flex gap-2 items-center ${className}`}>
        <Button
          className={`button-border-lightBlue ${styleButton}`}
          onClick={() => navigate("/auth/signin")}
        >
          Sign In
        </Button>
        <Button className={`button-bg-lightBlue ${styleButton}`}>
          Get Started
        </Button>
      </div>
    );
  },
);

const navs = [
  {
    url: "/",
    name: "Home",
    icon: <Home />,
  },
  {
    url: "/products",
    name: "Products",
    icon: <Handbag />,
  },
];

const NavsHeader = React.memo(
  ({
    styleNav,
    styleUl,
    styleLi,
    postionIcon,
  }: {
    styleNav?: string;
    styleUl?: string;
    styleLi?: string;
    postionIcon?: "right" | "left";
  }) => {
    return (
      <nav className={`${styleNav}`}>
        <ul className={`flex gap-12 cursor-default ${styleUl}`}>
          {navs.map((nav, index) => (
            <NavLink to={nav.url} key={index}>
              <li
                className={`duration-300 items-center flex gap-2 justify-between transition-all hover:text-lightBlue ${styleLi}`}
              >
                {postionIcon === "left" && nav.icon}
                {nav.name}{" "}
                {postionIcon === "right" || !postionIcon ? nav.icon : null}
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    );
  },
);

const SideBarMobileHeader = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>SideBar</SheetTitle>
        </SheetHeader>
        <SheetDescription className={"px-4"}>Navs</SheetDescription>
        <NavsHeader
          styleNav="w-full px-4"
          styleUl="flex-col"
          styleLi="bg-lightBlue text-white p-3 rounded-md"
        />

        <SheetFooter>
          <ButtonsHeader
            className="flex-col justify-center"
            styleButton="w-full"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const HeaderLandingPage = () => {
  return (
    <header className="w-full h-14 sticky border rounded-2xl border-[#a0a0a0]  top-4 left-0 px-[clamp(1rem,4vw,8rem)] z-30 bg-transparent backdrop-blur-lg sm:h-16">
      <div className="w-full h-full flex justify-between items-center py-4">
        <div className="flex gap-2 items-center">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.QTXG590851jLdUZ4T4WemQHaEI?r=0&pid=Api&h=220&P=0"
            alt="logo"
            className="w-8 h-8 hidden rounded-lg md:flex"
          />
          <h1 className="font-bold">
            Gel <span className="text-lightBlue">Prodex</span>
          </h1>
        </div>

        <div className="hidden items-center md:flex">
          <NavsHeader postionIcon="left" />
        </div>

        <div className="hidden items-center md:flex">
          <ButtonsHeader />
        </div>

        <div className="md:hidden">
          <SideBarMobileHeader />
        </div>
      </div>
    </header>
  );
};

export default HeaderLandingPage;
