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
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setStatus("Les mots de passe ne correspondent pas.");
      setTimeout(() => setStatus(null), 4000);
      return;
    }

    try {
      const bodyData = isLogin
        ? { email: formData.email, password: formData.password, userType }
        : {
            email: formData.email,
            password: formData.password,
            university: selectedUniversity,
            faculty: selectedFaculty,
          };

      const response = await fetch(`/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userType', data.userType || 'enseignant');
        localStorage.setItem('university', data.university || selectedUniversity);
        localStorage.setItem('faculty', data.faculty || selectedFaculty);
        localStorage.setItem('status', data.status);

        if (data.status === 'validated') {
          if (data.userType === 'enseignant') router.push('/DashbordEns');
          else if (data.userType === 'chef_departement') router.push('/DashbordChef');
        } else if (data.status === 'pending') {
          router.push('/auth/pending');
        }
      } else {
        setStatus(data.message || "Erreur d'authentification.");
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error('Erreur :', error);
      setStatus("Erreur de connexion au serveur.");
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
            {isLogin
              ? "Connectez-vous à votre compte"
              : "Inscrivez-vous pour commencer à suivre vos heures"}
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
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
            />

            {/* Confirm Password (only for signup) */}
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
              />
            )}

            {/* UserType (only login) */}
            {isLogin && (
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
                required
              >
                <option value="">Type d'utilisateur</option>
                <option value="enseignant">Enseignant</option>
                <option value="chef_departement">Chef de département</option>
              </select>
            )}

            {/* University + Faculty (only signup) */}
            {!isLogin && (
              <>
                <select
                  onChange={handleUniversityChange}
                  value={selectedUniversity}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2"
                  required
                >
                  <option value="">Université</option>
                  {universities.map((u) => (
                    <option key={u.name} value={u.name}>{u.name}</option>
                  ))}
                </select>

                <select
                  onChange={handleFacultyChange}
                  value={selectedFaculty}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2"
                  disabled={!faculties.length}
                  required
                >
                  <option value="">Faculté</option>
                  {faculties.map((f) => (
                    <option key={f.name} value={f.name}>{f.name}</option>
                  ))}
                </select>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-900 transition duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>

            {status && (
              <div className="mt-3 p-3 text-red-600 bg-red-50 rounded-xl border border-red-200">
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
