import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";

export default function DashboardAdminPage() {
  return (
    <DashboardPageLayout
      title="Admin Dashboard"
      subtitle="Welcome to the admin dashboard. Here you can manage users, view analytics, and configure settings for your application."
    >
      Admin Dashboard
    </DashboardPageLayout>
  );
}
