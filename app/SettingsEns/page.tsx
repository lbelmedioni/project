'use client';
import Menu from "@/components/Menu";
import NavbarDash from "@/components/NavbarDash";
import SettingsEnsContent from "@/components/SettingsEnsContent";

export default function SettingsEns() {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white p-3">
        <Menu />
      </div>
      <div className="w-[86%] bg-gray-50 p-5">
        <NavbarDash />
        <SettingsEnsContent />
      </div>
    </div>
  );
}