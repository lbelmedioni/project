'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarChef() {
  const pathname = usePathname();

  const [chef, setChef] = useState({
    nom: "Benziane",
    prenom: "Nassim",
    avatar: "/images/noavatr.png"
  });

  return (
    <nav className="w-full max-w-screen-xl mx-auto mt-4 px-6 py-4 bg-white border border-gray-200 shadow-md rounded-lg flex items-center justify-between">
      <div className="text-black font-semibold capitalize text-lg">
        Page {pathname.split('/').pop()}
      </div>
      <div className="flex items-center gap-6">
        <button className="rounded-full w-7 h-7 flex items-center justify-center hover:opacity-80 transition-opacity">
          <Image 
            src="/images/notif.png" 
            alt="Notifications" 
            width={20} 
            height={20}
            priority
          />
        </button>
        <Link href="/chef/profile" className="flex flex-col cursor-pointer group">
          <span className="text-xs leading-3 font-medium text-gray-800 group-hover:text-green-600">
            {`${chef.nom} ${chef.prenom}`}
          </span>
          <span className="text-[10px] text-gray-500 text-right group-hover:text-green-500">Chef de Département</span>
        </Link>
        <div className="rounded-full hover:opacity-80 transition-opacity">
          <Image 
            src={chef.avatar}
            className="cursor-pointer rounded-full" 
            alt="Avatar" 
            width={36} 
            height={36}
            priority
          />
        </div>
      </div>
    </nav>
  );
}
