// Définit la structure globale du site (header, footer, sidebar...)
"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Récupérer le chemin actuel
  const isAuthPage = ["/auth/authEns", "/auth/authAdmin" , "/DashbordEns" ,"/admin" , "/DashboardAdm/adminUniv" ,"/Profile" ,"/Settings" , "/DashboardAdm/adminChef" , "/DashboardChef" , "/DashboardChef/ListeEns", "/DashboardChef/Heures" , "/DashboardChef/Inscription" , "/auth/completProfile"].includes(pathname); // Ajout de /admin/login

  return (
    <html lang="fr">
      <body className="bg-white dark:bg-gray-900">
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
