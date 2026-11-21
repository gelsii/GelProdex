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
import { LogOutIcon } from "lucide-react";
import { Settings } from "lucide-react";
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
import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { currentUserContext } from "@/contexts/currentUser";

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
            <LogOutIcon />
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

const SettingsDialog = () => {
  const user = React.useContext(currentUserContext);
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className={" gap-2 button-bg-lightBlue justify-start pl-4 sm:flex"}>
            <Settings /> Settings
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
              <Input
                type="text"
                defaultValue={user?.userData?.username}
                disabled
              />
            </div>
            <div className="flex gap-2">
              <Label>Email:</Label>
              <Input
                type="email"
                defaultValue={user?.userData?.email}
                disabled
              />
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

export default SettingsDialog;
