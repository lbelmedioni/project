'use client';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const initialData = [
  { id: 1, nom: 'Benali', prenom: 'Amine', email: 'amine@uhbc.dz', universite: 'UHBC', faculte: 'Informatique', departement: 'Systèmes d\'Information' },
  { id: 2, nom: 'Kaci', prenom: 'Nour', email: 'nour@uhbc.dz', universite: 'UHBC', faculte: 'Mathématiques', departement: 'Mathématiques Pures' },
  { id: 3, nom: 'Bouzidi', prenom: 'Sara', email: 'sara@univ-bba.dz', universite: 'UNIV-BBA', faculte: 'Sciences Économiques', departement: 'Économie' },
  { id: 4, nom: 'Djebali', prenom: 'Mohamed', email: 'mohamed@univ-bba.dz', universite: 'UNIV-BBA', faculte: 'Droit', departement: 'Droit Privé' },
  { id: 5, nom: 'Hamdi', prenom: 'Fatima', email: 'fatima@univ-annaba.dz', universite: 'UNIV-Annaba', faculte: 'Médecine', departement: 'Médecine Générale' },
  { id: 6, nom: 'Zerrouki', prenom: 'Ahmed', email: 'ahmed@univ-annaba.dz', universite: 'UNIV-Annaba', faculte: 'Ingénierie', departement: 'Génie Civil' },
  { id: 7, nom: 'Boussaid', prenom: 'Lina', email: 'lina@univ-setif.dz', universite: 'UNIV-Setif', faculte: 'Sciences', departement: 'Physique' },
  { id: 8, nom: 'Cherif', prenom: 'Karim', email: 'karim@univ-setif.dz', universite: 'UNIV-Setif', faculte: 'Technologie', departement: 'Informatique' }
];

export default function GestionChefDepartement() {
  const [chefs, setChefs] = useState(initialData);
  const [filters, setFilters] = useState({ global: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    universite: '',
    faculte: '',
    departement: ''
  });
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const universities = [...new Set(chefs.map(chef => chef.universite))];

  const handleDelete = (id) => {
    setChefs(chefs.filter((chef) => chef.id !== id));
  };

  const handleFilterChange = (value) => {
    setFilters({ ...filters, global: value });
  };

  const filteredData = chefs.filter((chef) => {
    const searchTerm = filters.global.toLowerCase();
    return Object.values(chef).some((field) =>
      field.toString().toLowerCase().includes(searchTerm)
    );
  });

  const universityData = selectedUniversity 
    ? filteredData.filter(chef => chef.universite === selectedUniversity)
    : filteredData;

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      universite: '',
      faculte: '',
      departement: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.universite || !formData.faculte || !formData.departement) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newId = chefs.length > 0 ? Math.max(...chefs.map(c => c.id)) + 1 : 1;
    const newChef = {
      id: newId,
      ...formData
    };

    setChefs(prev => [...prev, newChef]);
    handleModalClose();
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Chefs de Département</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Rechercher un chef..."
            value={filters.global}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAdd} 
          className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Ajouter
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex flex-wrap justify-center" aria-label="Tabs">
            <button
              onClick={() => setSelectedUniversity(null)}
              className={`px-4 py-2 text-sm font-medium ${
                !selectedUniversity ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'
              }`}
            >
              Toutes les universités
            </button>
            {universities.map((univ) => (
              <button
                key={univ}
                onClick={() => setSelectedUniversity(univ)}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedUniversity === univ ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'
                }`}
              >
                {univ}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Faculté</th>
              <th className="px-4 py-2 text-left">Département</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {universityData.map((chef) => (
              <tr key={chef.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{chef.nom}</td>
                <td className="px-4 py-2">{chef.prenom}</td>
                <td className="px-4 py-2">{chef.email}</td>
                <td className="px-4 py-2">{chef.faculte}</td>
                <td className="px-4 py-2">{chef.departement}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleDelete(chef.id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {universityData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  {filters.global ? 'Aucun résultat trouvé' : 'Aucun chef de département'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Ajouter un nouveau chef</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
              
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                required
              />
              <Input
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                placeholder="Prénom"
                required
              />
              <Input
              
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <Input
                
                name="universite"
                value={formData.universite}
                onChange={handleInputChange}
                placeholder="Université"
                required
              />
              <Input
                
                name="faculte"
                value={formData.faculte}
                onChange={handleInputChange}
                placeholder="Faculté"
                required
              />
              <Input
              
                name="departement"
                value={formData.departement}
                onChange={handleInputChange}
                placeholder="Département"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  type="button"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
