'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

// Mock data
const mockTeachers = [
  {
    id: '1',
    name: 'Professeur 1',
    totalHours: 20,
    status: 'pending',
    courses: [
      { name: 'Mathématiques', hours: 10 },
      { name: 'Physique', hours: 10 }
    ]
  },
  {
    id: '2',
    name: 'Professeur 2',
    totalHours: 15,
    status: 'verified',
    courses: [
      { name: 'Informatique', hours: 15 }
    ]
  }
];

export default function DashboardChef() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [pendingHours, setPendingHours] = useState(0);

  useEffect(() => {
    calculateStatistics(teachers);
  }, []);

  const calculateStatistics = (data) => {
    const total = data.reduce((sum, teacher) => sum + teacher.totalHours, 0);
    const pending = data.filter(t => t.status === 'pending').reduce((sum, teacher) => sum + teacher.totalHours, 0);
    setTotalHours(total);
    setPendingHours(pending);
  };

  const handleVerifyHours = (teacherId, status) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === teacherId ? { ...teacher, status } : teacher
    ));
    calculateStatistics(teachers);
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
        <TableHeader>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Heures Déclarées</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeachers.map(teacher => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.totalHours}h</TableCell>
              <TableCell>
                <Badge variant={teacher.status === 'verified' ? 'success' : 'outline'}>
                  {teacher.status === 'verified' ? 'Vérifié' : 'En attente'}
                </Badge>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}