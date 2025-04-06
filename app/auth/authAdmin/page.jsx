'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [mtps, setMtps] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !mtps) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (!email.includes('@')) {
      setError('Veuillez entrer un email valide.');
      return;
    }

    // 💡 Simuler une réponse en attendant l'API
    if (email === 'admin@univ.com' && mtps === '123456') {
      console.log('Connexion réussie');
      router.push('/DashboardAdm/adminUniv');
    } else {
      setError('Email ou MTPS incorrect.');
    }
    //
    if (email === 'admin@chef.com' && mtps === '123456') {
      console.log('Connexion réussie');
      router.push('/DashboardAdm/adminChef');
    } else {
      setError('Email ou MTPS incorrect.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-xl bg-white dark:bg-gray-800 p-6">
        <CardHeader className="text-center">
          <UserCircleIcon className="mx-auto w-16 h-16 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Connexion Admin</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@exmple.com"
                className="mt-1 w-full p-2 border rounded-md" 
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">MTPS</label>
              <Input 
                type="password" 
                value={mtps} 
                onChange={(e) => setMtps(e.target.value)} 
                placeholder="Mot de passe temporaire"
                className="mt-1 w-full p-2 border rounded-md" 
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}







{/*'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircleIcon } from '@heroicons/react/24/solid';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [mtps, setMtps] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !mtps) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Veuillez entrer un email valide.');
      return;
    }

    // Simulation d'authentification (remplacer par un vrai appel API)
    if (email === 'admin@example.com' && mtps === '123456') {
      router.push('/admin/dashboard');
    } else {
      setError('Email ou MTPS incorrect.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-xl bg-white dark:bg-gray-800 p-6">
        <CardHeader>
        <UserCircleIcon className="mx-auto w-16 h-16 text-green-600 dark:text-green-400" />

        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@example.com"
                className="mt-1 w-full p-2 border rounded-md" 
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">MTPS</label>
              <Input 
                type="password" 
                value={mtps} 
                onChange={(e) => setMtps(e.target.value)} 
                placeholder="Mot de passe temporaire"
                className="mt-1 w-full p-2 border rounded-md" 
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} */}
