"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

const users = [
  {
    role: "Administrateur",
    description: "Gère les universités et facultés, modifie les paramètres du site.",
    icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
    link: "/login/admin",
  },
  {
    role: "Chef de Département",
    description: "Supervise les enseignants, valide les heures de vacation.",
    icon: <User className="w-12 h-12 text-green-600" />,
    link: "/login/chef-departement",
  },
  {
    role: "Enseignant",
    description: "Ajoute ses heures de vacation et suit son planning.",
    icon: <GraduationCap className="w-12 h-12 text-green-600" />,
    link: "/login/enseignant",
  },
];

export default function Utilisateurs() {
  const router = useRouter(
  ); // Hook pour gérer la navigation

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Choisissez votre rôle</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card key={index} className="p-6 text-center bg-white shadow-lg rounded-2xl hover:shadow-xl transition duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              {user.icon}
              <h2 className="text-xl font-semibold text-gray-800">{user.role}</h2>
              <p className="text-gray-600">{user.description}</p>
              <Button variant="outline" className="mt-4" onClick={() => router.push(user.link)}>
                Accéder
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
