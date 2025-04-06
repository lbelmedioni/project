import NavbarDash from "@/components/NavbarDash";
import Footer from "@/components/footer";

export default function DashbordChefLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDash />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}