import { Navbar } from "@/components/HEADER-FOOTER/navbar";
import { Toaster } from "@/components/ui/toaster";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Navbar />

      <main className="flex-1 p-4">{children}</main>
      <Toaster />
    </section>
  );
}
