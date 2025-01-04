import NavForProduct from "@/components/PRODUCT-CMP/product.page.navbar";
import { Toaster } from "@/components/ui/toaster";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <NavForProduct />

      <main className="flex-1 p-4">{children}</main>
      <Toaster />
    </section>
  );
}
