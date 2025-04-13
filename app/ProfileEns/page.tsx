import NavbarDash from "@/components/NavbarDash";
import Menu from "@/components/Menu";
import ProfileEnsContent from "@/components/ProfileEnsContent";

export default function ProfileEnsPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg z-10">
        <Menu />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow">
          <NavbarDash />
        </header>

        {/* Page content */}
        <main className="p-4 overflow-y-auto bg-muted">
          <ProfileEnsContent />
        </main>
      </div>
    </div>
  );
}

