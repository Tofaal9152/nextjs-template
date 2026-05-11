interface DashboardPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const DashboardPageLayout = ({
  title,
  subtitle,
  children,
  action,
}: DashboardPageLayoutProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between space-x-4 mb-6 ">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      {children}
    </div>
  );
};

export default DashboardPageLayout;
