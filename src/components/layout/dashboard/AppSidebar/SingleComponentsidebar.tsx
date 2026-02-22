import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
function SingleComponentsidebar({
  items,
  title,
}: {
  title: string;
  items: {
    name: string;
    url: string;
    hidden?: boolean;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item, idx) => (
          <SidebarMenuItem className="group" key={idx} hidden={item.hidden}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
export default SingleComponentsidebar;
