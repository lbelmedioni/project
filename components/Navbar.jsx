import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Utilisateurs", path: "utilisateurs" },
    { link: "À propos", path: "a propos" },
    { link: "Contact", path: "contact" },
  ];

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
    <header className={`w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 transition-all duration-300 ${isSticky ? "shadow-md bg-white" : ""}`}>
      <nav className="fixed top-0 left-0 w-full bg-white  z-50 dark:bg-gray-900 py-4 px-6 flex items-center">
        <div className="text-2xl font-semibold ml-10 ">
          <a href="#">Heure<span className="text-green-600">Track</span></a>
        </div>

        <div className="flex items-center gap-8 ml-auto">
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link 
                to={path} 
                spy={true} 
                smooth={true} 
                offset={-100} 
                activeClass="text-green-500 font-semibold"
                key={path} 
                className="cursor-pointer dark:text-gray-200 block text-base text-gray-900 hover:text-green-500 first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          <button onClick={toggleDarkMode} className="text-gray-800 dark:text-gray-200">
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </header>
  );
}




{/*"use client";

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
    <nav className="dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
     
      <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
      HeureTrack
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-green-500">
          Accueil
        </Link>
       

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-800 dark:text-gray-200 hover:text-green-500">
            Utilisateurs
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

        {/* BOUTON DARK/LIGHT MODE *
        <button onClick={toggleDarkMode} className="text-gray-800 dark:text-gray-200">
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
*/}