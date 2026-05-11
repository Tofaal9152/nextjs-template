"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { AppSidebarFooter } from "@/components/layout/sidebar/app-sidebar-footer";
import { AppSidebarHeader } from "@/components/layout/sidebar/app-sidebar-header";
import AppSidebarItems from "@/components/layout/sidebar/app-sidebar-items";
import { StudentSidebarNavItems } from "./student-sidebar-nav-items";

export function StudentSidebar({ session }: { session: any }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarHeader
          headerInfo={{
            imageSrc: null,
            companyName: "Example Inc.",
            dashboardType: "Student Dashboard",
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <AppSidebarItems items={StudentSidebarNavItems} />
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
