import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import { getSession } from "@/features/auth/_services/session";
import { AdminSidebar } from "@/features/protected/_pages/dashboard/admin/_sidebar/AdminSidebar";

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
