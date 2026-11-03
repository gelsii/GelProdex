import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="w-full h-full flex-col-start-center">
      <Outlet />
      <Toaster />
    </main>
  );
};

export default RootLayout;
