'use client'

import { useEffect, useState } from 'react'
import NavbarChef from '@/components/NavbarChef'
import MenuChef from '@/components/MenuChef'

interface User {
  nom: string
  prenom: string
  email: string
  role: string
  faculté: string
  departement: string
}

export default function ProfileChefLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId')
      if (!userId) return (window.location.href = '/auth/authEns')

      try {
        const res = await fetch('/api/user', {
          headers: { Authorization: userId },
        })
        if (!res.ok) return (window.location.href = '/auth/authEns')

        const data = await res.json()
        if (data.role !== 'Chef de Département') {
          return (window.location.href = '/unauthorized')
        }

        setUser(data)
      } catch (err) {
        console.error(err)
        window.location.href = '/auth/authEns'
      }
    }

    fetchUser()
  }, [])

  if (!user) return null

  return (
    <div className="h-screen flex">
      <div className="w-[14%] bg-gray-800">
        <MenuChef />
      </div>
      <div className="w-[86%] bg-[#F7F8FA] overflow-scroll">
        <NavbarChef />
        {children}
      </div>
    </div>
  )
}
