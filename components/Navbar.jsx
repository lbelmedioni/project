"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
      {/* LOGO */}
      <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        Suivi Heures
      </Link>

      {/* MENU */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-green-500">
          Accueil
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-800 dark:text-gray-200 hover:text-green-500">
            Utilisateur
            <ChevronDown className="ml-1 w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-md mt-2">
            <DropdownMenuItem asChild>
              <Link href="/auth/authAdmin">Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/authEns">Chef de Département</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/authEns">Enseignant</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-green-500">
          À propos
        </Link>
        <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-green-500">
          Contact
        </Link>

        {/* BOUTON DARK/LIGHT MODE */}
        <button onClick={toggleDarkMode} className="text-gray-800 dark:text-gray-200">
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
