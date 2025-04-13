


'use client';

import MenuLink from './MenuLink';
import {MdOutlineBrowseGallery,MdGroups, MdDashboard, MdSupervisedUserCircle,  } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Image from 'next/image';
import { MdLogout } from "react-icons/md";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { title: "Menu",
    list: [
        {
        title:"Dashboard",
        path: "/DashbordEns",
        icon: <MdDashboard size={24}/>,
    },
    {
      title:"Espace d'information",
      path: "/Dashbord",
      icon: <MdDashboard size={24}/>,
  },
   
   
  ],
  },
  {
    title: "Autre",
    list: [
      {
        title: " Paramétres",
        path: "/Settings",
        icon: <IoMdSettings size={24}/>,
      },
      {
        title: "Se déconnecter",
        path: "/auth/logout",
        icon: <MdLogout size={24}/>,
      },
    ],
  },
];

export default function MenuEns() {
  const pathname = usePathname();

  return (
    <div className="sticky top-[20px] bg-white">
      {/* Header Section */}
      <div className="flex items-center gap-2 p-3">
        <Image 
          src="/logos/informatique.png" 
          alt="Logo" 
          width={32} 
          height={32} 
          className="rounded"
        />
        <h1 className="text-base font-semibold text-green-600">
          Heure<span className="text-gray-900">Track</span>
        </h1>
      </div>

      {/* Menu Items */}
      <div className="p-3 space-y-2">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-xs font-medium text-gray-600 mb-1">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.list.map((item) => (
                <MenuLink 
                  key={item.path} 
                  item={item} 
                  pathname={pathname}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



{/* 
'use client';

import Link from "next/link";
import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/images/saisie.png",
          label: "Tableau de saisie",
          href: "/DashbordEns",
          visible: ["chef de departement", "enseignant"],
        },
        {
          icon: "/images/releves.png",
          label: "Relevés d'heures",
          href: "/list/parents",
          visible: ["chef de departement", "enseignant"],
        },
        {
          icon: "/images/statistiques.png",
          label: "Statistiques",
          href: "/list/subjects",
          visible: ["chef de departement" , "enseignant"],
        },
      ],
    },
    {
      title: "AUTRES",
      items: [
        {
          icon: "/images/2849830_multimedia_options_setting_settings_gear_icon.png",
           label: "Paramétres",
           href: "/Settings",
           visible: ["admin", "teacher", "student", "parent"],
         },
        {
         icon: "/images/logout.png",
          label: "Se deconnecter",
          href: "/logout",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
  ];

const Menu = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        router.push('/auth/authEns');
    };

    return ( 
        <div className="mt-4 text-sm">
            {menuItems.map(i => (
                <div className="mb-4" key={i.title}>
                    <span className="text-gray-400 font-light px-4 mb-2 block">{i.title}</span>
                    {i.items.map(item => (
                        item.label === "Logout" ? (
                            <button 
                                onClick={handleLogout} 
                                key={item.label} 
                                className={`flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors
                                    ${pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
                            >
                                <Image 
                                    src={item.icon} 
                                    width={20} 
                                    height={20} 
                                    alt={item.label}
                                    className="opacity-80"
                                />
                                <span className="ml-3">{item.label}</span>
                            </button>
                        ) : (
                            <Link 
                                href={item.href} 
                                key={item.label} 
                                className={`flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors
                                    ${pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
                            >
                                <Image 
                                    src={item.icon} 
                                    width={20} 
                                    height={20} 
                                    alt={item.label}
                                    className="opacity-80"
                                />
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}
 
export default Menu;*/}