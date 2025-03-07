import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";

export default function DashbordEnsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-screen flex">
        <div className="w-[14%] bg-red-200">
          <Link href="/" className="flex items-center justify-center gap-2">
          <Image src="/logos/informatique.png" alt="logo" width={32} height={32}/>
          <span className="hidden lg:block">Suivi</span>
          </Link>
          <Menu/>
        </div>
        <div className="w-[86%] bg-blue-200">l</div>
      </div>
    )

  }
