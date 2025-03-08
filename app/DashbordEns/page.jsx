"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardEnseignant() {
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const specialites = ["Informatique", "IA", "Réseaux", "Mathématiques", "Physique"];
  const types = ["Cours", "TD", "TP"];

  const loadHeures = () => {
    const savedHeures = localStorage.getItem("heures");
    return savedHeures ? JSON.parse(savedHeures) : [{ date: "", debut: "", fin: "", niveau: "", specialite: "", groupe: "", module: "", type: "", sujet: "", etat: "En attente" }];
  };

  const [heures, setHeures] = useState(loadHeures);

  useEffect(() => {
    localStorage.setItem("heures", JSON.stringify(heures));
  }, [heures.length]); // Ne réagit qu'au changement de longueur

  const ajouterLigne = () => {
    setHeures([...heures, { date: "", debut: "", fin: "", niveau: "", specialite: "", groupe: "", module: "", type: "", sujet: "", etat: "En attente" }]);
  };

  const modifierValeur = (index, champ, valeur) => {
    const nouvellesHeures = [...heures];
    nouvellesHeures[index][champ] = valeur;
    setHeures(nouvellesHeures);
  };

  const supprimerLignesVides = (data) => {
    return data.filter(h =>
      h.date || h.debut || h.fin || h.niveau || h.specialite || h.groupe || h.module || h.type || h.sujet
    );
  };

  const sauvegarder = () => {
    const heuresFiltrees = supprimerLignesVides(heures);
    if (heuresFiltrees.length === 0) {
      alert("Ajoutez au moins une ligne valide avant de sauvegarder.");
      return;
    }
    setHeures(heuresFiltrees);
    localStorage.setItem("heures", JSON.stringify(heuresFiltrees));
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-3">Heures saisies</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th>Date</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Niveau</th>
                <th>Spécialité</th>
                <th>Groupe</th>
                <th>Module</th>
                <th>Type</th>
                <th>Sujet</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {heures.map((item, index) => (
                <tr key={index}>
                  <td><input type="date" value={item.date} onChange={(e) => modifierValeur(index, "date", e.target.value)} className="border p-1 w-full" /></td>
                  <td><input type="time" value={item.debut} onChange={(e) => modifierValeur(index, "debut", e.target.value)} className="border p-1 w-full" /></td>
                  <td><input type="time" value={item.fin} onChange={(e) => modifierValeur(index, "fin", e.target.value)} className="border p-1 w-full" /></td>
                  <td>
                    <select value={item.niveau} onChange={(e) => modifierValeur(index, "niveau", e.target.value)} className="border p-1 w-full">
                      <option value="">Sélectionner</option>
                      {niveaux.map(niveau => <option key={niveau} value={niveau}>{niveau}</option>)}
                    </select>
                  </td>
                  <td>
                    <select value={item.specialite} onChange={(e) => modifierValeur(index, "specialite", e.target.value)} className="border p-1 w-full">
                      <option value="">Sélectionner</option>
                      {specialites.map(specialite => <option key={specialite} value={specialite}>{specialite}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={item.groupe} onChange={(e) => modifierValeur(index, "groupe", e.target.value)} className="border p-1 w-full" /></td>
                  <td><input type="text" value={item.module} onChange={(e) => modifierValeur(index, "module", e.target.value)} className="border p-1 w-full" /></td>
                  <td>
                    <select value={item.type} onChange={(e) => modifierValeur(index, "type", e.target.value)} className="border p-1 w-full">
                      <option value="">Sélectionner</option>
                      {types.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </td>
                  <td><input type="text" value={item.sujet} onChange={(e) => modifierValeur(index, "sujet", e.target.value)} className="border p-1 w-full" /></td>
                  <td>{item.etat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex space-x-4">
            <button onClick={ajouterLigne} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <PlusCircle className="mr-2" /> Ajouter une ligne
            </button>
            <button onClick={sauvegarder} className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              <Save className="mr-2" /> Sauvegarder
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
