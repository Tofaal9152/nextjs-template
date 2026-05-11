import { getSession } from "@/features/auth/utils/session";
import { AdminSidebar } from "@/features/protected/pages/dashboard/admin/sidebar/admin-sidebar";
import DashboardShell from "@/features/protected/pages/dashboard/shared/components/dashboard-shell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <DashboardShell sidebar={<AdminSidebar session={session} />}>
      {children}
    </DashboardShell>
  );
}
