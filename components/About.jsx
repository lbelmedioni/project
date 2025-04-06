'use client';

import { Settings, Clock, BarChart3, Bell } from 'lucide-react';

export default function AboutPage() {
  return (
    <div  id='a propos' className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div data-aos="fade-right"
         data-aos-anchor-placement="top-center"
        // data-aos-delay="300" 
        className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            À propos de notre plateforme
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment notre solution numérique révolutionne la gestion des heures de vacation pour les enseignants et les chefs de département.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div  data-aos="fade-right"
         data-aos-anchor-placement="top-center"
          data-aos-delay="300"
         className="p-6 text-center border-r border-gray-200">
            <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Gestion Simplifiée
            </h3>
            <p className="text-gray-600">
              Une interface intuitive pour gérer facilement vos heures de vacation.
            </p>
          </div>

          {/* Feature 2 */}
          <div  data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay="300"
           className="p-6 text-center border-r border-gray-200">
            <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Suivi en Temps Réel
            </h3>
            <p className="text-gray-600">
              Suivez vos enseignements et validations en temps réel.
            </p>
          </div>

          {/* Feature 3 */}
          <div  data-aos="fade-right"
         data-aos-anchor-placement="top-center"
          data-aos-delay="300"
           className="p-6 text-center border-r border-gray-200">
            <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Statistiques Complètes
            </h3>
            <p className="text-gray-600">
              Accédez à des rapports détaillés et des analyses statistiques.
            </p>
          </div>

          {/* Feature 4 */}
          <div  data-aos="fade-right"
         data-aos-anchor-placement="top-center"
          data-aos-delay="300"
          className="p-6 text-center">
            <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-4">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Notifications Intelligentes
            </h3>
            <p className="text-gray-600">
              Restez informé avec des notifications personnalisées et pertinentes.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div  className="mt-16 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Notre Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Notre plateforme a pour mission de faciliter la gestion des heures de vacation pour les enseignants et les chefs de département. Nous visons à créer un environnement numérique efficace et convivial pour tous les utilisateurs.
          </p>
        </div>
      </div>
    </div>
  );
}