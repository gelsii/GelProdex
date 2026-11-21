import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import SettingsDialog from "./SettingsDialog";
import { Link } from "react-router";
import { Package, PackagePlus, UserCircle } from "lucide-react";
import { currentUserContext } from "@/contexts/currentUser";

const navs = [
  {
    title: "Products",
    items: [
      {
        title: "Products",
        url: "/dashboard",
        icon: <Package />,
      },
      {
        title: "Create Product",
        url: "createProduct",
        icon: <PackagePlus />,
      },
    ],
  },
];

const DashboardSideBar = () => {
  const user = React.useContext(currentUserContext);

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <UserCircle />
          <h6>{user?.userData?.username}</h6>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navs.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link to={item.url}>
                          {item.icon} {item.title}
                        </Link>
                      }
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SettingsDialog />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSideBar;
