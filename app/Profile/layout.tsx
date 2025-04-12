'use client';
import { useEffect, useState } from "react";
import NavbarDash from "@/components/NavbarDash"; // Navbar pour Enseignant
import NavbarChef from "@/components/NavbarChef"; // Navbar pour Chef de Département
import Menu from "@/components/Menu"; // Menu pour Enseignant
import MenuChef from "@/components/MenuChef"; // Menu pour Chef de Département

// Définir le type User
interface User {
  nom: string;
  prenom: string;
  email: string;
  role: "Enseignant" | "Chef de Département";
  faculté: string;
  departement: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null); // Déclare user avec le type User ou null

  useEffect(() => {
    // Supposons qu'on récupère l'utilisateur authentifié depuis une API
    const fetchUserData = async () => {
      try {
        // Obtenir l'ID utilisateur depuis localStorage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          // Rediriger vers la page de connexion si pas d'ID utilisateur
          window.location.href = '/auth/authEns';
          return;
        }

        const res = await fetch("/api/user", {
          headers: {
            "Authorization": userId,
          },
        });

        if (!res.ok) {
          // Rediriger vers la page de connexion si l'authentification échoue
          window.location.href = '/auth/authEns';
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        // Rediriger vers la page de connexion en cas d'erreur
        window.location.href = '/auth/authEns';
      }
    };

    fetchUserData();
  }, []);

  // Si l'utilisateur n'est pas authentifié, ne pas afficher le contenu
  if (!user) {
    return null;
  }

  // Vérifie le rôle de l'utilisateur pour afficher la navbar et le menu correspondants
  const isEnseignant = user.role === "Enseignant";
  const isChef = user.role === "Chef de Département";

  return (
    <div className="h-screen flex">
      <div className="w-[14%] bg-gray-800">
        {isEnseignant ? <Menu /> : <MenuChef />} {/* Affiche le menu en fonction du rôle */}
      </div>
      <div className="w-[86%] bg-[#F7F8FA] overflow-scroll">
        {isEnseignant ? <NavbarDash /> : <NavbarChef />} {/* Affiche la navbar en fonction du rôle */}
        {children}
      </div>
    </div>
  );
}
