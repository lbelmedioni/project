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
        <div className="w-64 ">
         
          <Menu/>
        </div>
        <div className="w-[86%] bg-[#F7F8FA] overflow-hidden">
          <NavbarDash/>
          {children}
        </div>
      </div>
    );
}