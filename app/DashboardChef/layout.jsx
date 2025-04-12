'use client'

import MenuChef from '@/components/MenuChef'
import NavbarChef from '@/components/NavbarChef'
import '@/app/globals.css'


export default function DashbordChefLayout({ children }) {
    return (
        <div className="flex min-h-screen ">
            <div className="w-[14%] bg-[#cedcc3] p-5">
           <MenuChef />
            </div>
            <div className="w-[86%] bg-[#a7b99e] p-5">
                <NavbarChef />
                {children}
            </div>
        </div>
    )
}