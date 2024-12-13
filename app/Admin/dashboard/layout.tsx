import AdminSidebar from "@/components/admin/admin.sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4"> 
        {children}
      </div>
    </section>
  );
}