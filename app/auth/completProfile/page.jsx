'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function CompleteProfile() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    department: '',
    birthdate: '',
    gender: '',
    location: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId')
    if (!userId) return alert('Utilisateur non identifié.')

    try {
      const res = await fetch('/api/users/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      })

      const data = await res.json()
      if (res.ok) {
        router.push('/auth/pending')
      } else {
        alert(data.message || 'Erreur lors de la mise à jour.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-700 to-green-900">
      <div className="flex w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Partie gauche */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-500/10 to-green-700/10 min-h-[500px]">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Complétez votre profil</h2>
          <p className="text-base text-green-700 text-center mb-6">
            Merci de renseigner les informations manquantes pour finaliser votre inscription.
          </p>
        </div>

        {/* Partie droite */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 min-h-[500px]">
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
                placeholder="Informatique, Mathématiques..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
              >
                <option value="">Sélectionner</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Chlef, Oran, Alger..."
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
