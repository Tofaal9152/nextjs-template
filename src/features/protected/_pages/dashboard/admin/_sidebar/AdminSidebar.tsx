"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { AppSidebarFooter } from "@/components/layout/dashboard/AppSidebar/AppSidebarFooter";
import { AppSidebarHeader } from "@/components/layout/dashboard/AppSidebar/AppSidebarHeader";

import AppSidebarItems from "@/components/layout/dashboard/AppSidebar/AppSidebarItems";
import { AdminSidebarNavItems } from "./AdminSidebarNavItems";

export function AdminSidebar({ session }: { session: any }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader
          headerInfo={{
            imageSrc: null,
            companyName: "Example Inc.",
            dashboardType: "Admin Dashboard",
          }}
        />
      </SidebarHeader>

      <SidebarContent className="pl-1">
        <AppSidebarItems items={AdminSidebarNavItems} />
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter>
        <AppSidebarFooter
          footerInfo={{
            name: session?.user?.name || "Guest User",
            email: session?.user?.email || "No email available",
            avatar: "/noImage.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
