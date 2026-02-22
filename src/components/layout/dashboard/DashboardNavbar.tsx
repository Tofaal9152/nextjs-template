import { ModeToggle } from "@/components/shared/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardNavbar = () => {
  return (
    <header
      className="
        sticky top-0 z-20
        flex shrink-0 items-center justify-between gap-2
        border-b
        dark:bg-[#02091A]
        px-4 py-1.5
        backdrop-blur
        transition-[width,height,background-color]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
       
      "
    >
      {/* Left side: Sidebar Trigger + title */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
      </div>
      <ModeToggle />
    </header>
  );
};

export default DashboardNavbar;
