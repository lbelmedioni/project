'use client';

import MenuLink from './MenuLink';
import {MdOutlineBrowseGallery,MdGroups, MdDashboard, MdSupervisedUserCircle,  } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Image from 'next/image';
import { MdLogout } from "react-icons/md";



const menuItems = [
  { title: "Menu",
    list: [
        {
        title:"Dashboard",
        path: "/DashboardChef",
        icon: <MdDashboard />,
    },
    {
        title:"Liste des enseignants",
        path: "/DashboardChef/ListeEns",
        icon: <MdGroups size={74}/>,
    },
    {
        title:"Heures saisies",
        path: "/DashboardChef/Heures",
        icon: <MdOutlineBrowseGallery size={24}/>,
    },
    {
        title:"Inscriptions en attente",
        path: "/DashboardChef/Inscription",
        icon: <MdSupervisedUserCircle size={84}/>,
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
      
    ],
  },
];

export default function MenuChef() {
  return (
    <div className="sticky top-[40px]  ">
        <div className="flex items-center gap-2 mb-4">
        <Image src="/logos/informatique.png" alt="logo" width={32} height={32} className="rounded"/>
        <span className="hidden lg:block text-xl font-semibold">Heure<span className="text-green-600">Track</span></span>
      </div>
      <ul className="space-y-2">
         {menuItems.map(cat=>(
       <li key={cat.title}>
          <span className='text-gray-600 font-light px-4 mb-2 block '>{cat.title}</span>
          {cat.list.map(item=>(
            <MenuLink item={item} key={item.title}/>
          ))}
          </li>
     ))}
      </ul>
     
      <button className="flex items-center gap-2 px-4 py-2 w-full rounded-lg  text-black hover:bg-[#FDFAF6]">
      <MdLogout size={24} className="text-black" />
       Se déconnecter
</button>


    </div>
  );
}