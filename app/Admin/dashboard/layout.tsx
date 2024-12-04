import AdminSidebar from "@/components/admin.sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4"> {/* This will take the remaining space */}
        {children}
      </div>
    </section>
  );
}