import { Navbar } from "@/components/HEADER-FOOTER/navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />

      <main className="flex-1 p-4">{children}</main>
     
    </section>
  );
}
