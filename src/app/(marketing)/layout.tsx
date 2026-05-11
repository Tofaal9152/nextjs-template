import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";

export default function MarkettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <section className="min-h-screen container mx-auto bg-accent">
        {children}
      </section>
      <Footer />
    </section>
  );
}
