"use client";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Clock, FileText, BarChart, PlusCircle, User } from "lucide-react";

export default function DashboardEnseignant() {
  const [selectedMenu, setSelectedMenu] = useState("heures");
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];
  const specialites = ["Informatique", "IA", "Réseaux", "Mathématiques", "Physique"];
  const types = ["Cours", "TD", "TP"];
  const utilisateur = { nom: "Nell Goodman", role: "Enseignant" };

  const loadHeures = () => {
    const savedHeures = localStorage.getItem("heures");
    return savedHeures ? JSON.parse(savedHeures) : [];
  };

  const [heures, setHeures] = useState(loadHeures);

  useEffect(() => {
    localStorage.setItem("heures", JSON.stringify(heures));
  }, [heures]);

  const ajouterLigne = () => {
    setHeures([...heures, { date: "", debut: "", fin: "", niveau: "", specialite: "", groupe: "", module: "", type: "", sujet: "", etat: "En attente" }]);
  };

  const modifierValeur = (index, champ, valeur) => {
    const nouvellesHeures = [...heures];
    nouvellesHeures[index][champ] = valeur;
    setHeures(nouvellesHeures);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64 h-full bg-gray-900 text-white p-4">
        <Menu>
          <MenuItem icon={<LayoutDashboard />} onClick={() => setSelectedMenu("heures")}>
            Heures saisies
          </MenuItem>
          <MenuItem icon={<Clock />} onClick={() => setSelectedMenu("planning")}>
            Planning
          </MenuItem>
          <MenuItem icon={<FileText />} onClick={() => setSelectedMenu("releves")}>
            Relevés d'heures
          </MenuItem>
          <MenuItem icon={<BarChart />} onClick={() => setSelectedMenu("statistiques")}>
            Statistiques
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Contenu principal */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        {/* Profil utilisateur */}
        <div className="absolute top-4 right-6 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
          <User className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold">{utilisateur.nom}</p>
            <p className="text-xs text-gray-500">{utilisateur.role}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Dashboard Enseignant</h1>
        {selectedMenu === "heures" && (
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-3">Heures saisies</h2>
              <Table>
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
                      <td><input type="text" value={item.date} onChange={(e) => modifierValeur(index, "date", e.target.value)} className="border p-1 w-full" /></td>
                      <td><input type="text" value={item.debut} onChange={(e) => modifierValeur(index, "debut", e.target.value)} className="border p-1 w-full" /></td>
                      <td><input type="text" value={item.fin} onChange={(e) => modifierValeur(index, "fin", e.target.value)} className="border p-1 w-full" /></td>
                      <td>
                        <select value={item.niveau} onChange={(e) => modifierValeur(index, "niveau", e.target.value)} className="border p-1 w-full">
                          <option value="">Sélectionner</option>
                          {niveaux.map((niveau) => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select value={item.specialite} onChange={(e) => modifierValeur(index, "specialite", e.target.value)} className="border p-1 w-full">
                          <option value="">Sélectionner</option>
                          {specialites.map((specialite) => (
                            <option key={specialite} value={specialite}>{specialite}</option>
                          ))}
                        </select>
                      </td>
                      <td><input type="text" value={item.groupe} onChange={(e) => modifierValeur(index, "groupe", e.target.value)} className="border p-1 w-full" /></td>
                      <td><input type="text" value={item.module} onChange={(e) => modifierValeur(index, "module", e.target.value)} className="border p-1 w-full" /></td>
                      <td>
                        <select value={item.type} onChange={(e) => modifierValeur(index, "type", e.target.value)} className="border p-1 w-full">
                          <option value="">Sélectionner</option>
                          {types.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </td>
                      <td><input type="text" value={item.sujet} onChange={(e) => modifierValeur(index, "sujet", e.target.value)} className="border p-1 w-full" /></td>
                      <td>{item.etat}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <button
                onClick={ajouterLigne}
                className="mt-4 flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <PlusCircle className="mr-2" /> Ajouter une ligne
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
