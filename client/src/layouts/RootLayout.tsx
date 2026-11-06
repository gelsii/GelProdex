import ContextProvider from "@/components/ui/ContextProvider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="w-full h-full flex-col-start-center">
      <ContextProvider>
        <Outlet />
        <Toaster />
      </ContextProvider>
    </main>
  );
};

export default RootLayout;
