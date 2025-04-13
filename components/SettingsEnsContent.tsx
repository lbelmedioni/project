'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  universite: string;
  faculte: string;
  departement: string;
  dateNaissance: string;
}

export default function SettingsEnsContent() {
  const [formData, setFormData] = useState<FormData>({
    nom: "Benziane",
    prenom: "Nassim",
    email: "nassim.benziane@uhbc.dz",
    universite: "Université Hassiba Ben Bouali",
    faculte: "Faculté des Sciences Exactes et Informatique",
    departement: "Informatique",
    dateNaissance: "1980-01-15",
  });

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('enseignantData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('enseignantData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save all changes
      console.log('Saving all changes:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white shadow-lg rounded-xl">
      {/* Header Section */}
      <div className="px-6 py-8 border-b">
        <div className="flex items-center gap-4">
          <Image 
            src="/logos/informatique.png" 
            alt="Logo" 
            width={48} 
            height={48} 
            className="rounded"
          />
          <h1 className="text-2xl font-bold text-green-600">
            Heure<span className="text-gray-900">Track</span>
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Card className="relative overflow-hidden">
            <CardContent className="relative p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="space-y-1 group">
                  <p className="text-sm text-green-600 capitalize group-hover:text-green-800 transition-colors">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <div className="flex flex-col gap-2">
                    <input
                      type={key === 'dateNaissance' ? 'date' : 'text'}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}