'use client';

import { useState, useEffect } from 'react';
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const data = [ /* Les données de l'étape 1 ici */ ];

export default function AddChefForm() {
  const [chefs, setChefs] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalHours, setTotalHours] = useState(0);
  const [pendingHours, setPendingHours] = useState(0);

  const faculties = selectedUniversity ? selectedUniversity.faculties : [];
  const departments = selectedFaculty ? selectedFaculty.departments : [];
  const departmentTeachers = selectedDepartment ? selectedDepartment.teachers : [];

  useEffect(() => {
    fetchChefs();
    fetchTeachersData();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await fetch('/api/chefs');
      const data = await response.json();
      setChefs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des chefs:', error);
      alert('Erreur lors de la récupération des chefs');
    }
  };

  const fetchTeachersData = async () => {
    try {
      const response = await fetch('/api/teachers/department');
      const data = await response.json();
      setTeachers(data);
      calculateStatistics(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      alert('Erreur lors du chargement des données');
    }
  };

  const calculateStatistics = (data) => {
    const total = data.reduce((sum, teacher) => sum + teacher.totalHours, 0);
    const pending = data.filter(t => t.status === 'pending').reduce((sum, teacher) => sum + teacher.totalHours, 0);
    setTotalHours(total);
    setPendingHours(pending);
  };

  const handleVerifyHours = async (teacherId, status) => {
    try {
      await fetch(`/api/teachers/verify/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      fetchTeachersData();
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      alert('Erreur lors de la vérification des heures');
    }
  };

  const handleSubmit = async () => {
    if (!selectedUniversity || !selectedFaculty || !selectedDepartment || !selectedTeacher) {
      alert('Veuillez sélectionner toutes les options.');
      return;
    }

    try {
      const response = await fetch('/api/chefs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universite: selectedUniversity.id,
          faculte: selectedFaculty.id,
          departement: selectedDepartment.id,
          enseignant: selectedTeacher.id
        }),
      });

      if (response.ok) {
        alert('Chef ajouté avec succès');
        setSelectedUniversity(null);
        setSelectedFaculty(null);
        setSelectedDepartment(null);
        setSelectedTeacher(null);
        fetchChefs();
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du chef:', error);
      alert('Erreur lors de l\'ajout du chef');
    }
  };

  const handleDelete = async (chefId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce chef ?')) {
      try {
        const response = await fetch(`/api/chefs/${chefId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Chef supprimé avec succès');
          fetchChefs();
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du chef:', error);
        alert('Erreur lors de la suppression du chef');
      }
    }
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Gestion des Chefs de Département</h2>

        {/* Formulaire d'ajout */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter un Chef</h3>
          
          {/* Université */}
          <Select 
            onValueChange={(value) => setSelectedUniversity(data.find((u) => u.id == value))}
            className="mb-3"
          >
            <SelectItem value="">Sélectionnez une Université</SelectItem>
            {data.map((univ) => (
              <SelectItem key={univ.id} value={univ.id}>{univ.name}</SelectItem>
            ))}
          </Select>

          {/* Faculté */}
          <Select 
            onValueChange={(value) => setSelectedFaculty(faculties.find((f) => f.id == value))}
            disabled={!selectedUniversity}
            className="mb-3"
          >
            <SelectItem value="">Sélectionnez une Faculté</SelectItem>
            {faculties.map((fac) => (
              <SelectItem key={fac.id} value={fac.id}>{fac.name}</SelectItem>
            ))}
          </Select>

          {/* Département */}
          <Select 
            onValueChange={(value) => setSelectedDepartment(departments.find((d) => d.id == value))}
            disabled={!selectedFaculty}
            className="mb-3"
          >
            <SelectItem value="">Sélectionnez un Département</SelectItem>
            {departments.map((dep) => (
              <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
            ))}
          </Select>

          {/* Enseignant */}
          <Select 
            onValueChange={(value) => setSelectedTeacher(departmentTeachers.find((t) => t.id == value))}
            disabled={!selectedDepartment}
            className="mb-3"
          >
            <SelectItem value="">Sélectionnez un Enseignant</SelectItem>
            {departmentTeachers.map((teacher) => (
              <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
            ))}
          </Select>

          <Button 
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleSubmit}
          >
            Ajouter
          </Button>
        </div>

        {/* Tableau des chefs */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Liste des Chefs de Département</h3>
          <Table>
            <thead>
              <tr>
                <th>Université</th>
                <th>Faculté</th>
                <th>Département</th>
                <th>Chef de département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chefs.map((chef) => (
                <tr key={chef.id}>
                  <td>{chef.universite}</td>
                  <td>{chef.faculte}</td>
                  <td>{chef.departement}</td>
                  <td>{chef.enseignant}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Button 
                        className="bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => handleEdit(chef.id)}
                      >
                        Modifier
                      </Button>
                      <Button 
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDelete(chef.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des Heures</CardTitle>
              <Badge variant="outline">{totalHours}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heures en Attente</CardTitle>
              <Badge variant="outline" className="bg-yellow-500">{pendingHours}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingHours}h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nombre d'Enseignants</CardTitle>
              <Badge variant="outline">{teachers.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedSemester}
            onValueChange={setSelectedSemester}
          >
            <SelectItem value="sem1">Semestre 1</SelectItem>
            <SelectItem value="sem2">Semestre 2</SelectItem>
          </Select>
        </div>

        {/* Teachers Table */}
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nom</Table.HeaderCell>
              <Table.HeaderCell>Heures Déclarées</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTeachers.map(teacher => (
              <Table.Row key={teacher.id}>
                <Table.Cell>{teacher.name}</Table.Cell>
                <Table.Cell>{teacher.totalHours}h</Table.Cell>
                <Table.Cell>
                  <Badge variant={teacher.status === 'verified' ? 'success' : 'outline'}>
                    {teacher.status === 'verified' ? 'Vérifié' : 'En attente'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {teacher.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleVerifyHours(teacher.id, 'verified')}
                      >
                        Vérifier
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleVerifyHours(teacher.id, 'rejected')}
                      >
                        Rejeter
                      </Button>
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}