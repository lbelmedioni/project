
{/*"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const faculties = [
  {
    id: 1,
    name: "Faculté d'Informatique",
    departments: [
      {
        id: 1,
        name: "Informatique Générale",
        chef: null,
        enseignants: ["Ahmed Belkacem", "Nour El Houda", "Sofiane Amrani"]
      },
      {
        id: 2,
        name: "Systèmes d'Information",
        chef: "Kamel Ouali",
        enseignants: ["Kamel Ouali", "Leila Bensalem", "Yassine Hachani"]
      }
    ]
  }
];

export default function ManageChefs() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedDepartment(null);
  };

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const handleSelectChef = (enseignant) => {
    setSelectedDepartment({ ...selectedDepartment, chef: enseignant });
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
   
      <div>
        <h2 className="text-xl font-bold mb-2">Facultés</h2>
        {faculties.map((faculty) => (
          <Card key={faculty.id} className="mb-2 cursor-pointer" onClick={() => handleSelectFaculty(faculty)}>
            <CardContent className="p-4">{faculty.name}</CardContent>
          </Card>
        ))}
      </div>

   
      {selectedFaculty && (
        <div>
          <h2 className="text-xl font-bold mb-2">Départements - {selectedFaculty.name}</h2>
          {selectedFaculty.departments.map((dept) => (
            <Card key={dept.id} className="mb-2 cursor-pointer" onClick={() => handleSelectDepartment(dept)}>
              <CardContent className="p-4">
                {dept.name} - <strong>{dept.chef || "Aucun Chef"}</strong>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    
      {selectedDepartment && (
        <div>
          <h2 className="text-xl font-bold mb-2">Sélectionner un Chef - {selectedDepartment.name}</h2>
          {selectedDepartment.enseignants.map((enseignant) => (
            <Button key={enseignant} className="m-1" onClick={() => handleSelectChef(enseignant)}>
              {enseignant}
            </Button>
          ))}
          <p className="mt-4">Chef actuel : <strong>{selectedDepartment.chef || "Aucun"}</strong></p>
        </div>
      )}
    </div>
  );
} 
*/}
export default function AdminUniversitePage() {
    return (
      <div>
        <h1 className="text-2xl font-bold">Gestion des Universités et Facultés</h1>
        <p>Ici, l'admin peut gérer les universités et les facultés.</p>
      </div>
    );
  }
  