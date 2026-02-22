"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

export function AppSidebarContent({
  items,
  title,
}: {
  title: string;
  items: {
    title: string;
    icon?: LucideIcon;
    hiddenMain?: boolean;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      hidden?: boolean;
    }[];
  }[];
}) {
  const { setOpenMobile, openMobile } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-accent dark:text-accent-foreground">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, idx) => (
          <Collapsible
            key={idx}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem hidden={item.hiddenMain}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon className="mr-2 w-4 h-4 " />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((item, idx) => (
                    <Link key={idx} href={item.url}>
                      <SidebarMenuButton
                        className="cursor-pointer"
                        hidden={item.hidden}
                        onClick={() => setOpenMobile(!openMobile)}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
