"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, GraduationCap } from "lucide-react";

const users = [
  {
    role: "Administrateur",
    description: "Gère les universités, facultés et les chefs de départements.",
    icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
    link: "/auth/authAdmin",
  },
  {
    role: "Chef de Département",
    description: "Supervise les enseignants, valide les heures de vacation.",
    icon: <User className="w-12 h-12 text-green-600" />,
    link: "/auth/authEns",
  },
  {
    role: "Enseignant",
    description: "Ajoute ses heures de vacation et suit son planning.",
    icon: <GraduationCap className="w-12 h-12 text-green-600" />,
    link: "/auth/authEns",
  },
];

export default function Utilisateurs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6" id="utilisateurs">
      <h1 className="text-3xl font-bold mb-8 ">Utilisateurs </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card data-aos="flip-right" 
          data-aos-anchor-placement="top-center" 
          data-aos-delay={`${index * 100}`}
          key={index} 
          onClick={() => window.location.href = user.link}
          className="p-6 text-center cursor-pointer bg-white shadow rounded-2xl hover:shadow-xl transition duration-300">
            <CardContent className="flex flex-col items-center space-y-4">
              {user.icon}
              <h2 className="text-xl font-semibold text-gray-800">{user.role}</h2>
              <p className="text-gray-600">{user.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
