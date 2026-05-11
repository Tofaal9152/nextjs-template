"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export type SidebarSubItem = {
  title: string;
  url: string;
  icon: LucideIcon; // required
};

export type SidebarSingleItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: never; // ✅ important: prevents union confusion
  defaultOpen?: never;
};

export type SidebarGroupItem = {
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  url?: never; // ✅ important: group has no direct url
  items: SidebarSubItem[];
};

export type SidebarNavItem = SidebarSingleItem | SidebarGroupItem;

// ✅ type guard (best way)
function isGroupItem(item: SidebarNavItem): item is SidebarGroupItem {
  return Array.isArray((item as SidebarGroupItem).items);
}

export default function AppSidebarItems({
  items,
}: {
  items: SidebarNavItem[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        // GROUP
        if (isGroupItem(item)) {
          const Icon = item.icon;

          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.defaultOpen ?? false}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="group">
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((sub) => {
                      const SubIcon = sub.icon;

                      return (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={sub.url}>
                              <SubIcon className="mr-2 h-4 w-4" />
                              {sub.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        // SINGLE
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
