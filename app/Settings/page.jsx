'use client';

import { FaUser, FaEnvelope, FaUniversity, FaBuilding, FaSave } from "react-icons/fa";

export default function Settings() {
  const formData = {
    fullName: "Admin",
    email: "admin@admin.com",
    faculty: "Math et Informatique",
    department: "Informatique",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      faculty: formData.get('faculty'),
      department: formData.get('department')
    };
    
    // TODO: Ajouter la logique pour sauvegarder les modifications
    console.log("Données mises à jour:", data);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F7F8FA] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-green-500 p-4 text-center">
            <h1 className="text-xl font-semibold text-white">Paramètres du Compte</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <FaUser className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-green-600 font-medium mb-1">NOM COMPLET</label>
                  <input
                    type="text"
                    name="fullName"
                    defaultValue={formData.fullName}
                    className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-green-600 font-medium mb-1">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={formData.email}
                    className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <FaUniversity className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-green-600 font-medium mb-1">FACULTÉ</label>
                  <input
                    type="text"
                    name="faculty"
                    defaultValue={formData.faculty}
                    className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <FaBuilding className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-green-600 font-medium mb-1">DÉPARTEMENT</label>
                  <input
                    type="text"
                    name="department"
                    defaultValue={formData.department}
                    className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}