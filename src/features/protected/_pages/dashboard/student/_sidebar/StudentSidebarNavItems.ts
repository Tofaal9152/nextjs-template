import {
  FileText,
  LayoutDashboard,
  MapPin,
  UserRound,
  Users
} from "lucide-react";

export const StudentSidebarNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    title: "Student Management",
    url: "/dashboard/student/student-management",
    icon: MapPin,
  },
  {
    title: "Profile & Settings",
    icon: Users,
    defaultOpen: true, // ✅ open by default (auto-collapsed option)
    items: [
      {
        title: "My Profile",
        url: "/dashboard/student/profile",
        icon: UserRound, 
      },

      {
        title: "Account Settings",
        url: "/dashboard/student/account-settings",
        icon: FileText,
      },
    ],
  },
];
