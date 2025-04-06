import Image from "next/image";

export default function HeroSection() {
  return (
    <div data-aos="fade-up" data-aos-delay="200" className="w-full flex justify-center">
      <Image 
        src="/images/landingPage.png" // Pas d'import, on utilise juste le chemin
        alt="Illustration de suivi des heures"
        width={500}
        height={400}
        className="max-w-full h-auto"
      />
    </div>
  );
}
//components/ :Contient les composants réutilisables (boutons, formulaires, cartes...).