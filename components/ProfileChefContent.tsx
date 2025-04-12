'use client';

import { useEffect, useState } from 'react';

interface ChefData {
  nom: string;
  prenom: string;
  email: string;
  departement: string;
  faculté: string;
  université: string;
}

export default function ProfileChefContent() {
  const [chef, setChef] = useState<ChefData | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      window.location.href = '/auth/authEns';
      return;
    }

    const fetchChef = async () => {
      try {
        const res = await fetch('/api/user', {
          headers: { Authorization: userId },
        });

        if (!res.ok) {
          window.location.href = '/auth/authEns';
          return;
        }

        const data = await res.json();
        setChef(data);
      } catch (error) {
        console.error('Erreur lors du chargement du profil chef :', error);
        window.location.href = '/auth/authEns';
      }
    };

    fetchChef();
  }, []);

  if (!chef) return <div className="p-6 text-gray-700">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Profil Chef de Département</h1>
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <p><strong>Nom :</strong> {chef.nom}</p>
        <p><strong>Prénom :</strong> {chef.prenom}</p>
        <p><strong>Email :</strong> {chef.email}</p>
        <p><strong>Département :</strong> {chef.departement}</p>
        <p><strong>Faculté :</strong> {chef.faculté}</p>
        <p><strong>Université :</strong> {chef.université}</p>
      </div>
    </div>
  );
}
