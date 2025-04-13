

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarEns() {
  const pathname = usePathname();

  const [enseignant, setEnseignant] = useState({
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
        <Link href="/ProfileEns" className="flex flex-col cursor-pointer group">
          <span className="text-xs leading-3 font-medium text-gray-800 group-hover:text-green-600">
            {`${enseignant.nom} ${enseignant.prenom}`}
          </span>
          <span className="text-[10px] text-gray-500 text-right group-hover:text-green-500">Enseignant</span>
        </Link>
        <div className="rounded-full hover:opacity-80 transition-opacity">
          <Image 
            src={enseignant.avatar}
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


{/* 
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavbarDash = () => {
    // Données statiques temporairement
    const [enseignant, setEnseignant] = useState({
        nom: "Harbouche",
        prenom: "Ahmed",
        avatar: "/images/avatar.png"
    });

    return ( 
        <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
            <div className="hidden md:flex"></div>
            <div className="flex items-center gap-6">
                <button className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
                    <Image 
                        src="/images/notif.png" 
                        alt="Notifications" 
                        width={20} 
                        height={20}
                        priority
                    />
                </button>
                <Link href="/Profile" className="flex flex-col cursor-pointer group">
                    <span className="text-xs leading-3 font-medium text-gray-800 group-hover:text-green-600">
                        {`${enseignant.nom} ${enseignant.prenom}`}
                    </span>
                    <span className="text-[10px] text-gray-500 text-right group-hover:text-green-500">Enseignant</span>
                </Link>
                <div className="rounded-full hover:opacity-80 transition-opacity duration-200">
                    <Image 
                        src={enseignant.avatar}
                        className="cursor-pointer rounded-full" 
                        alt="Profile avatar" 
                        width={36} 
                        height={36}
                        priority
                    />
                </div>
            </div>
        </nav>
    );
}

export default NavbarDash;*/}