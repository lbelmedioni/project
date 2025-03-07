import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center">
  <div className="container mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between max-w-screen-xl">
    
    {/* Texte à gauche, encore plus à gauche */}
    <div className="w-full md:w-5/12 flex flex-col items-start text-left ">
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-5">
        Bienvenue sur Suivi des Heures
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Gérez efficacement les heures de vacation des enseignants.
      </p>
      <Link
        href="/auth/authEns"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block"
      >
        Commencez Maintenant
      </Link>
    </div>

    {/* Image à droite, encore plus à droite */}
    <div className="w-full md:w-7/12 flex justify-end mr-[-50px]">
      <HeroSection/>
    </div>
  </div>
</main>

  );
}
