'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileData {
  nom: string;
  prenom: string;
  email: string;
  universite: string;
  faculte: string;
  departement: string;
  dateNaissance: string;
}

export default function ProfileEnsContent() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("enseignantData");
    if (data) {
      setProfileData(JSON.parse(data));
    }
  }, []);

  if (!profileData) {
    return <div className="p-6 text-center text-gray-600">Chargement des données...</div>;
  }

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

      {/* Profile Content */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Card className="relative overflow-hidden">
            <CardContent className="relative p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData).map(([key, value]) => (
                <div key={key} className="space-y-1 group">
                  <p className="text-sm text-green-600 capitalize group-hover:text-green-800 transition-colors">
                    {key.replace(/([A-Z])/g, " $1")}
                  </p>
                  <p className="font-medium text-gray-900 group-hover:text-green-900 transition-colors">
                    {value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
