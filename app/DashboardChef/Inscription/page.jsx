'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function InscriptionEnAttente() {
  const [enseignants, setEnseignants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") || "";
    setSearch(searchQuery);

    fetch(`/api/enseignants/en-attente?page=${page}&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        setEnseignants(data.enseignants);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  const handleAccept = (id) => {
    fetch(`/api/enseignants/accepter/${id}`, { method: 'PUT' }).then(() => refresh());
  };

  const handleRefuse = (id) => {
    fetch(`/api/enseignants/refuser/${id}`, { method: 'PUT' }).then(() => refresh());
  };

  const refresh = () => {
    fetch(`/api/enseignants/en-attente?page=${page}&search=${search}`)
      .then(res => res.json())
      .then(data => {
        setEnseignants(data.enseignants);
        setTotalPages(data.totalPages);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inscriptions en attente</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Prénom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enseignants.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucun enseignant en attente</td>
              </tr>
            ) : (
              enseignants.map((ens) => (
                <tr key={ens.id} className="border-b">
                  <td className="p-2">{ens.nom}</td>
                  <td className="p-2">{ens.prenom}</td>
                  <td className="p-2">{ens.email}</td>
                  <td className="p-2">{ens.statut}</td>
                  <td className="p-2 flex gap-2">
                    <Button onClick={() => handleAccept(ens.id)} className="bg-green-600 hover:bg-green-700 text-white">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleRefuse(ens.id)} className="bg-red-600 hover:bg-red-700 text-white">
                      <X className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-black"
        >
          Précédent
        </Button>
        <span className="self-center font-semibold">Page {page} / {totalPages}</span>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-black"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
