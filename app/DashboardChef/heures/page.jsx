"use client";

import { useEffect, useState } from "react";

export default function TableauHeures() {
  const [heures, setHeures] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState({
    nom: "",
    module: "",
    date: "",
  });

  useEffect(() => {
    fetch("/api/heures-saisies")
      .then((res) => res.json())
      .then((data) => {
        setHeures(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Erreur lors de la récupération des heures saisies", err));
  }, []);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    const updatedSearch = { ...search, [name]: value.toLowerCase() };

    const filteredData = heures.filter((entry) =>
      Object.entries(updatedSearch).every(
        ([key, val]) => entry[key]?.toLowerCase().includes(val)
      )
    );

    setSearch(updatedSearch);
    setFiltered(filteredData);
  };

  const handleAction = async (action, entry) => {
    try {
      const response = await fetch('/api/heures-saisies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: entry.id,
          status: action === 'valider' ? 'validé' : 'refusé'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la mise à jour');
      }

      const updatedEntry = await response.json();
      setHeures(prev => prev.map(item => item.id === entry.id ? updatedEntry : item));
      setFiltered(prev => prev.map(item => item.id === entry.id ? updatedEntry : item));
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la mise à jour');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tableau des Heures Saisies</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['nom', 'module', 'date'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`Rechercher par ${field}`}
            value={search[field]}
            onChange={handleSearch}
            className="border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring focus:ring-green-200"
          />
        ))}
      </div>
      <table className="w-full table-auto bg-[#f7faf7] rounded">
        <thead>
          <tr className="bg-[#dbe9d3] text-left">
            <th className="p-2">Nom</th>
            <th className="p-2">Module</th>
            <th className="p-2">Heures Saisies</th>
            <th className="p-2">Date</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((entry, idx) => (
              <tr key={idx} className="border-b hover:bg-[#f0f8f0]">
                <td className="p-2">{entry.nom}</td>
                <td className="p-2">{entry.module}</td>
                <td className="p-2">{entry.nbHeures}</td>
                <td className="p-2">{entry.date}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${
                    entry.status === 'validé' ? 'bg-green-100 text-green-800' :
                    entry.status === 'refusé' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.status || 'En attente'}
                  </span>
                </td>
                <td className="p-2">
                  {entry.status === 'En attente' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction('valider', entry)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Valider
                      </button>
                      <button
                        onClick={() => handleAction('refuser', entry)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Aucun enregistrement trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
