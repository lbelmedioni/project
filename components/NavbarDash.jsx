import Image from "next/image";
const NavbarDash = () => {
    return ( 
        <div className="flex items-center justify-between p-4">
            <div className="hidden md:flex"></div>
            <div className="flex items-center gap-6">
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image src="/images/notif.png" alt="" width={20} height={20}/>
                </div>
            <div className="flex flex-col">
                <span className="text-xs leading-3 font-meduim">harbouche</span>
                <span className="text-[10px] text-gray-500 text-right">Enseignant</span>
            </div>
            <Image src="/images/avatar.png" alt="" width={36} height={36}/>
            </div>
        </div>
     );
}
 
export default NavbarDash;