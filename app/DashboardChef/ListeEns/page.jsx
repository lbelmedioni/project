"use client";

import { useEffect, useState } from "react";

export default function ListeEns() {
  const [enseignants, setEnseignants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/ListeEns")
      .then((res) => res.json())
      .then((data) => {
        setEnseignants(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const searchLower = search.toLowerCase();
    const filteredData = enseignants.filter((ens) =>
      ["nom", "prenom", "email", "universite", "faculte"].some((field) =>
        ens[field]?.toLowerCase().includes(searchLower)
      )
    );
    setFiltered(filteredData);
  }, [search, enseignants]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Liste des Enseignants</h2>

      {/* 🔍 Champ de recherche global */}
      <input
        type="text"
        placeholder="Rechercher un enseignant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring focus:ring-green-200"
      />

      <table className="w-full table-auto bg-[#f7faf7] rounded">
        <thead>
          <tr className="bg-[#dbe9d3] text-left">
            <th className="p-2">Nom</th>
            <th className="p-2">Prénom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Université</th>
            <th className="p-2">Faculté</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((ens, idx) => (
              <tr key={idx} className="border-b hover:bg-[#f0f8f0]">
                <td className="p-2">{ens.nom}</td>
                <td className="p-2">{ens.prenom}</td>
                <td className="p-2">{ens.email}</td>
                <td className="p-2">{ens.universite}</td>
                <td className="p-2">{ens.faculte}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Aucun enseignant trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
