import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import { getSession } from "@/lib/session";
import { StudentSidebar } from "@/features/protected/_pages/dashboard/student/_sidebar/StudentSidebar";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <DashboardShell sidebar={<StudentSidebar session={session} />}>
      {children}
    </DashboardShell>
  );
}
