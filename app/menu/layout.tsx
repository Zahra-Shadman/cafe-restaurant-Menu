import CategorySidebar from "@/components/product-component/get-categoryies";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <aside className="w-1/2"> 
        <CategorySidebar />
      </aside>
      <main className="flex-1 p-4"> 
        {children}
      </main>
    </section>
  );
}