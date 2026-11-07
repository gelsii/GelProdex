import { LayoutDashboard, Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={" gap-2 button-bg-lightBlue sm:flex"}>
            <Settings />
            Settings
          </Button>
        }
      ></DialogTrigger>
      <DialogContent className={"h-[90%] "}>
        <DialogHeader>
          <DialogTitle className={"flex gap-2 items-center"}>
            <Settings /> Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account preferences, customize your experience, and
            adjust application settings to suit your needs.
          </DialogDescription>

          <Separator />

          <div className="grid gap-4">
            <div className="flex gap-2">
              <Label>Username:</Label>
              <Input type="text" defaultValue={"admin"} disabled />
            </div>
            <div className="flex gap-2">
              <Label>Email:</Label>
              <Input type="email" defaultValue={"admin@gmail.com"} disabled />
            </div>
            <div className="flex gap-2">
              <Label>Password:</Label>
              <Input type="password" defaultValue={"******"} disabled />
            </div>
          </div>

          <Separator />

          <Button variant={"destructive"}>Logout</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const navs = [
  {
    name: "Products",
    url: "/dashboard",
  },
  {
    name: "Add Products",
    url: "createProduct",
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
          <ul className="flex gap-8 items-center h-full ">
            {navs.map((nav, index) => (
              <NavLink key={index} to={nav.url}>
                <li className="cursor-default font-heading transition-all duration-300 hover:text-lightBlue">
                  {nav.name}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>

        <SettingsDialog />
      </div>
    </header>
  );
};

export default Header;
