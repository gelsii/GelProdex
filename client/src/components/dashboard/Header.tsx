import { LayoutDashboard, Menu, Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useOnFetch } from "@/hooks/useFetch";
import type {
  messageResponse,
  errorMessageResponse,
} from "@/types/messageResponseType";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { tokenContext } from "@/contexts/token";

const LogoutDialog = () => {
  const navigate = useNavigate();
  const token = React.useContext(tokenContext);

  const { fetchAPI } = useOnFetch({
    url: "/auth/logout",
    method: "DELETE",
    authorization: `Bearer ${token?.userToken}`,
    onSuccess: (data: messageResponse) => {
      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error: AxiosError<errorMessageResponse>) =>
      toast.error(error.response?.data.detail),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Logout</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to end your current session. You will need to log in
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => fetchAPI()}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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

const Navigations = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-8 items-center h-full sm:flex-row">
        {navs.map((nav, index) => (
          <NavLink key={index} to={nav.url} className={"w-full"}>
            <Button className="cursor-default font-heading transition-all button-bg-lightBlue px-6 w-full duration-300 rounded-lg hover:text-lightBlue ">
              {nav.name}
            </Button>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

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

          <LogoutDialog />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const MobileHeader = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigations</SheetTitle>
          </SheetHeader>

          <Navigations />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Header = () => {
  return (
    <header className="w-full h-18 sticky z-31 backdrop-blur-md top-0 left-0 flex justify-start items-center shadow-2xl">
      <div className="w-full h-full justify-between items-center flex px-[clamp(1.2rem,6vw,12rem)] ">
        <div className="flex gap-2 items-center h-full">
          <div className="sm:hidden">
            <MobileHeader />
          </div>
          <h1 className="flex gap-2 items-center font-bold text-lg text-lightBlue">
            <LayoutDashboard />
            Dashboard
          </h1>
        </div>

        <div className="hidden sm:flex">
          <Navigations />
        </div>

        <div className="hidden sm:flex"></div>

        <SettingsDialog />
      </div>
    </header>
  );
};

export default Header;
