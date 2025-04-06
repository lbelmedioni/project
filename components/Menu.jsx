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
           label: "Settings",
           href: "/Settings",
           visible: ["admin", "teacher", "student", "parent"],
         },
        {
         icon: "/images/logout.png",
          label: "Logout",
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
 
export default Menu;