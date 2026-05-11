import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  MapPin,
  Users,
} from "lucide-react";

export const AdminSidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/dashboard/admin/user-management",
    icon: MapPin,
  },
  {
    title: "Student Management",
    icon: Users,
    defaultOpen: true, // ✅ open by default (auto-collapsed option)
    items: [
      {
        title: "Students",
        url: "/dashboard/admin/student-management/students",
        icon: Building2, // ✅ icon required
      },
      {
        title: "Services",
        url: "/dashboard/admin/student-management/services",
        icon: Briefcase,
      },
      {
        title: "Student Performance",
        url: "/dashboard/admin/student-management/student-performance",
        icon: BarChart3,
      },
      {
        title: "Revenue Report",
        url: "/dashboard/admin/student-management/revenue-report",
        icon: FileText,
      },
    ],
  },
];
