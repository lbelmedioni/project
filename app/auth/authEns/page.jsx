'use client';

import { useState, useEffect } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [universityLogo, setUniversityLogo] = useState(null);
  const [facultyLogo, setFacultyLogo] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  useEffect(() => {
    fetch('/api/universities')
      .then(response => response.json())
      .then(data => setUniversities(data))
      .catch(error => console.error("Erreur lors du chargement des universités :", error));
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetch(`/api/faculties?university=${selectedUniversity}`)
        .then(response => response.json())
        .then(data => setFaculties(data))
        .catch(error => console.error("Erreur lors du chargement des facultés :", error));
    } else {
      setFaculties([]);
      setFacultyLogo(null);
    }
  }, [selectedUniversity]);

  const handleUniversityChange = (e) => {
    const universityName = e.target.value;
    setSelectedUniversity(universityName);
    const selected = universities.find(u => u.name === universityName);
    setUniversityLogo(selected ? selected.logo : null);
  };

  const handleFacultyChange = (e) => {
    const facultyName = e.target.value;
    setSelectedFaculty(facultyName);
    const selected = faculties.find(f => f.name === facultyName);
    setFacultyLogo(selected ? selected.logo : null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Partie gauche */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-[#e8f5e9] text-white min-h-[500px]">
          <h2 className="text-2xl font-bold text-green-700 text-center">Bienvenue sur notre plateforme</h2>
          <p className="mt-2 text-center text-green-700">
            Connectez-vous pour gérer vos heures de vacation et accéder à vos informations
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 px-6 bg-green-700 text-white py-2 rounded hover:bg-green-900 transition"
          >
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
          <div className="mt-4 flex flex-col items-center">
            {universityLogo && <img src={universityLogo} alt="Université" className="h-12" />}
            {facultyLogo && <img src={facultyLogo} alt="Faculté" className="h-10 mt-2" />}
          </div>
        </div>

        {/* Partie droite */}
        <div className="w-1/2 flex flex-col justify-center p-8 bg-white min-h-[500px]">
          <h2 className="text-xl font-bold text-green-700 text-center mb-4">{isLogin ? 'Connexion' : 'Inscription'}</h2>
          <form className="space-y-3">
            {!isLogin && <input type="text" placeholder="Nom d'utilisateur" className="w-full p-2 border rounded" />}
            <input type="email" placeholder="E-mail" className="w-full p-2 border rounded" />
            <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded" />
            {!isLogin && (
              <>
                <select className="w-full p-2 border rounded" onChange={handleUniversityChange} value={selectedUniversity}>
                  <option value="">Sélectionner une université</option>
                  {universities.map((univ) => (
                    <option key={univ.name} value={univ.name}>{univ.name}</option>
                  ))}
                </select>
                <select className="w-full p-2 border rounded" onChange={handleFacultyChange} value={selectedFaculty} disabled={!faculties.length}>
                  <option value="">Sélectionner une faculté</option>
                  {faculties.map((fac) => (
                    <option key={fac.name} value={fac.name}>{fac.name}</option>
                  ))}
                </select>
              </>
            )}
            <button className="mt-3 w-full bg-green-700 text-white py-2 rounded hover:bg-green-900 transition">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

AuthPage.authPage = true;