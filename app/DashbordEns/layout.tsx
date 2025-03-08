import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import NavbarDash from "@/components/NavbarDash";

export default function DashbordEnsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-screen flex">
        <div className="w-[14%] ">
          <Link href="/" className="flex items-center justify-center gap-2 ">
          <Image src="/logos/informatique.png" alt="logo" width={32} height={32}/>
          <span className="hidden lg:block">Suivi</span>
          </Link>
          <Menu/>
        </div>
        <div className="w-[86%] bg-[#F7F8FA] overflow-scroll">
          <NavbarDash/>
          {children}
        </div>
      </div>
    )

  }
