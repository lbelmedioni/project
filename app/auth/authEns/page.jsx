'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('enseignant');
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState(null);
  const router = useRouter();

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
    }
  }, [selectedUniversity]);

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
  };

  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          university: selectedUniversity,
          faculty: selectedFaculty,
          userType: userType
        })
      });
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('userId', data.id);
        localStorage.setItem('university', selectedUniversity);
        localStorage.setItem('faculty', selectedFaculty);
        localStorage.setItem('status', data.status);
        localStorage.setItem('userType', data.userType);
  
        // Redirection selon le type d'utilisateur et le statut
        if (data.status === 'validated') {
          if (data.userType === 'enseignant') {
            router.push('/DashbordEns');
          } else if (data.userType === 'chef_departement') {
            router.push('/DashbordChef');
          }
        } else if (data.status === 'pending') {
          router.push('/auth/pending');
        }
      } else {
        setStatus(data.message || 'Erreur lors de l\\\'authentification');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error('Erreur :', error);
      setStatus('Erreur lors de l\\\'authentification');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-700 to-green-900">
      <div className="flex w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Partie gauche */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-500/10 to-green-700/10 min-h-[500px]">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Bienvenue sur notre plateforme</h2>
          <p className="text-base text-green-700 text-center mb-6">
            Connectez-vous pour gérer vos heures de vacation et accéder à vos informations
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>
        </div>

        {/* Partie droite */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 min-h-[500px]">
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div className="w-full">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-4 w-full">
                <select
                  id="userType"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="">Type d'utilisateur</option>
                  <option value="enseignant">Enseignant</option>
                  <option value="chef_departement">Chef de département</option>
                </select>

                <select
                  id="university"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                  onChange={handleUniversityChange}
                  value={selectedUniversity}
                  required
                >
                  <option value="">Université</option>
                  {universities.map((univ) => (
                    <option key={univ.name} value={univ.name}>{univ.name}</option>
                  ))}
                </select>

                <select
                  id="faculty"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all duration-200"
                  onChange={handleFacultyChange}
                  value={selectedFaculty}
                  disabled={!faculties.length}
                  required
                >
                  <option value="">Faculté</option>
                  {faculties.map((fac) => (
                    <option key={fac.name} value={fac.name}>{fac.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
              >
                {isLogin ? 'Se connecter' : 'Créer un compte'}
              </button>
            </div>

            {status && (
              <div className="mt-3 p-3 text-red-600 bg-red-50/90 rounded-xl border border-red-200 w-full">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

AuthPage.authPage = true;