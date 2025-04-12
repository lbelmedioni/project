'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Transactions = () => {
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      const res = await fetch("/api/enseignants/pending");
      const data = await res.json();
      setEnseignants(data);
    };

    fetchPending();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="mb-5 font-light text-black">Enseignants en attente</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2">Nom</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enseignants.length === 0 ? (
            <tr><td colSpan={4} className="p-2 text-center text-gray-500">Aucun enseignant en attente</td></tr>
          ) : (
            enseignants.map((ens, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <Image src="/images/noavatr.png" alt="user" width={32} height={32} className="rounded-full object-cover" />
                  <span>{ens.nom} {ens.prenom}</span>
                </td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded text-sm bg-[#f7cb7375]">En attente</span>
                </td>
                <td className="p-2">{ens.date}</td>
                <td className="p-2">
                  <button className="px-4 py-2 bg-green-50 text-gray-700 rounded-lg hover:bg-green-100 transition-colors">Accepter</button>
                  <button className="px-4 py-2 bg-red-50 text-gray-700 rounded-lg hover:bg-red-100 transition-colors ml-3">Refuser</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
