import ContextProvider from "@/components/ui/ContextProvider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className=" w-full h-full">
      <ContextProvider>
        <Outlet />
        <Toaster />
      </ContextProvider>
    </main>
  );
};

export default RootLayout;
