import AdminSidebar from "@/components/admin/DASHBOARD/admin.sidebar";
import TokenExpirationChecker from "@/components/admin/TokenExpirationChecker";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <AdminSidebar />
      <TokenExpirationChecker />
      <div className="flex-1 p-4">{children}</div>
    </section>
  );
}
