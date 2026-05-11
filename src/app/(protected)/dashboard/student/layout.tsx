import { getSession } from "@/features/auth/utils/session";
import DashboardShell from "@/features/protected/pages/dashboard/shared/components/dashboard-shell";
import { StudentSidebar } from "@/features/protected/pages/dashboard/student/sidebar/student-sidebar";

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
