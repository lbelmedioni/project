"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Save, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DashboardEnseignant() {
  const router = useRouter();
  // Données statiques temporairement
  const [enseignantData, setEnseignantData] = useState({
    nom: "Harbouche",
    prenom: "Ahmed",
    id: 1
  });

  const [modules, setModules] = useState([
    { id: 1, nom: "Mathématiques" },
    { id: 2, nom: "Informatique" },
    { id: 3, nom: "Physique" }
  ]);

  const [specialites, setSpecialites] = useState([
    { id: 1, nom: "Informatique" },
    { id: 2, nom: "Mathématiques" }
  ]);

  const [niveaux, setNiveaux] = useState([
    { id: 1, nom: "L1" },
    { id: 2, nom: "L2" },
    { id: 3, nom: "L3" }
  ]);
  
  // État pour les heures
  const [heures, setHeures] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedHeures = localStorage.getItem("heures");
      return savedHeures ? JSON.parse(savedHeures) : [{
        date: "", debut: "", fin: "", niveau: "",
        specialite: "", groupe: "", module: "",
        type: "", sujet: ""
      }];
    }
    return [{
      date: "", debut: "", fin: "", niveau: "",
      specialite: "", groupe: "", module: "",
      type: "", sujet: ""
    }];
  });

  const [sujetEnEdition, setSujetEnEdition] = useState(null);
  const types = ["Cours", "TD", "TP"];
  const groupes = ["Groupe A", "Groupe B", "Groupe C"];

  useEffect(() => {
    localStorage.setItem("heures", JSON.stringify(heures));
  }, [heures]);

  const modifierValeur = (index, champ, valeur) => {
    const nouvellesHeures = [...heures];
    nouvellesHeures[index][champ] = valeur;
    setHeures(nouvellesHeures);
  };

  const ajouterLigne = () => {
    setHeures([...heures, {
      date: "", debut: "", fin: "", niveau: "",
      specialite: "", groupe: "", module: "",
      type: "", sujet: ""
    }]);
  };

  const supprimerLigne = (index) => {
    const nouvellesHeures = heures.filter((_, i) => i !== index);
    setHeures(nouvellesHeures);
  };

  const sauvegarderHeures = () => {
    localStorage.setItem("heures", JSON.stringify(heures));
    alert('Heures sauvegardées avec succès');
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Gestion des Heures d'Enseignement</h2>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Début</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fin</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Niveau</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Spécialité</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Groupe</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Module</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sujet</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {heures.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input type="date" value={item.date} onChange={(e) => modifierValeur(index, "date", e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="time" value={item.debut} onChange={(e) => modifierValeur(index, "debut", e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="time" value={item.fin} onChange={(e) => modifierValeur(index, "fin", e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500" />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.niveau}
                          onChange={(e) => modifierValeur(index, "niveau", e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                          <option value="">Sélectionner</option>
                          {niveaux.map(niveau => (
                            <option key={niveau.id} value={niveau.id}>
                              {niveau.nom}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.specialite}
                          onChange={(e) => modifierValeur(index, "specialite", e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                          <option value="">Sélectionner</option>
                          {specialites.map(specialite => (
                            <option key={specialite.id} value={specialite.id}>
                              {specialite.nom}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select value={item.groupe} onChange={(e) => modifierValeur(index, "groupe", e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500">
                          <option value="">Sélectionner</option>
                          {groupes.map(groupe => <option key={groupe} value={groupe}>{groupe}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.module}
                          onChange={(e) => modifierValeur(index, "module", e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                          <option value="">Sélectionner</option>
                          {modules.map(module => (
                            <option key={module.id} value={module.id}>
                              {module.nom}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select value={item.type} onChange={(e) => modifierValeur(index, "type", e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500">
                          <option value="">Sélectionner</option>
                          {types.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 relative">
                        {sujetEnEdition === index ? (
                          <div className="absolute z-10 right-0 w-64 bg-white border border-gray-200 shadow-lg rounded-lg">
                            <textarea
                              autoFocus
                              value={item.sujet}
                              onChange={(e) => modifierValeur(index, "sujet", e.target.value)}
                              onBlur={() => setSujetEnEdition(null)}
                              className="w-full p-3 border-0 rounded-lg focus:ring-2 focus:ring-green-500"
                              rows="3"
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={item.sujet}
                            onFocus={() => setSujetEnEdition(index)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer"
                            readOnly
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => supprimerLigne(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={ajouterLigne}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors shadow-sm"
              >
                <PlusCircle size={20} />
                <span>Ajouter ligne</span>
              </button>
              <button
                onClick={sauvegarderHeures}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors shadow-sm"
              >
                <Save size={20} />
                <span>Sauvegarder</span>
              </button>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
