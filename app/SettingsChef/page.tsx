'use client';
import MenuChef from "@/components/MenuChef";
import NavbarChef from "@/components/NavbarChef";
import SettingsChefContent from "@/components/SettingsChefContent";

export default function SettingsChef() {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white p-3">
        <MenuChef />
      </div>
      <div className="w-[86%] bg-gray-50 p-5">
        <NavbarChef />
        <SettingsChefContent />
      </div>
    </div>
  );
}