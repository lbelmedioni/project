"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Users from "@/components/Users";
import Link from "next/link";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  useEffect(() => {
    const initAOS = async () => {
      await import('aos');
      AOS.init({
        duration:1000,
        easing:'ease',
        once:true,
        anchorPlacement:'top-bottom',
      });
    };
    initAOS();
  }, []);
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    fetch("http://localhost:3000/test")
      .then((response) => response.text()) // Si ton API renvoie du texte
      .then((data) => setMessage(data))
      .catch((error) => setMessage("Erreur de connexion au backend"));
  }, []);

  return (
    <div id="home">
      <main className="pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center">
        {/* Texte à gauche */}
        <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between max-w-screen-xl">
          <div className="w-full md:w-5/12 flex flex-col items-start text-left">
            <h1 data-aos="fade-up" className="text-4xl font-semibold dark:text-gray-200 mb-5">
              Bienvenue sur <span className="text-green-600">Suivi des Heures</span>
            </h1>
            <p className="text-lg dark:text-gray-200 mb-6">
              Gérez efficacement les heures de vacation des enseignants.
            </p>
            <Link
              href="/auth/authEns"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block"
            >
              Commencez Maintenant
            </Link>
          </div>

          {/* Image à droite */}
          <div className="w-full md:w-7/12 flex justify-end mr-[-50px]">
            <HeroSection />
          </div>
        </div>

        {/* Résultat de l'API 
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Réponse API :</h2>
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>*/}
      </main>

      {/* Autres sections */}
      <Users />
      <About />
      <Contact />
    </div>
  );
}
