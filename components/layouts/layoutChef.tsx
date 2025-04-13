// components/layouts/ChefLayout.tsx
import NavbarChef from "@/components/NavbarChef"
import MenuChef from "@/components/MenuChef"


export default function ChefLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <MenuChef /> {/* Menu lik 3jbk */}
      <div className="flex-1 flex flex-col">
        <NavbarChef /> {/* Navbar li fih profil + notification */}
        <main className="flex-1 overflow-y-auto p-4 bg-muted">
          {children} {/* Kol contenu li ybdel (Dashboard/Profile/Settings...) */}
        </main>
      </div>
    </div>
  )
}
