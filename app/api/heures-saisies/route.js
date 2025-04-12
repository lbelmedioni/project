let fakeData = [
  { id: 1, nom: "Lundi", module: "Formation", nbHeures: 4, date: "2025-04-11", status: "En attente" },
  { id: 2, nom: "Mardi", module: "Formation", nbHeures: 6, date: "2025-04-12", status: "En attente" },
  { id: 3, nom: "Mercredi", module: "Formation", nbHeures: 5, date: "2025-04-13", status: "En attente" },
  { id: 4, nom: "Jeudi", module: "Formation", nbHeures: 7, date: "2025-04-14", status: "En attente" },
  { id: 5, nom: "Vendredi", module: "Formation", nbHeures: 3, date: "2025-04-15", status: "En attente" },
  { id: 6, nom: "Vendredi", module: "Formation", nbHeures: 3, date: "2025-04-15", status: "En attente" },
  { id: 7, nom: "dimenche", module: "Formation", nbHeures: 3, date: "2025-04-15", status: "En attente" },
];

export async function GET() {
  return Response.json(fakeData);
}

export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    
    // Trouver l'index de l'élément à mettre à jour
    const index = fakeData.findIndex(item => item.id === id);
    
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mettre à jour le statut
    fakeData[index] = {
      ...fakeData[index],
      status
    };

    return Response.json(fakeData[index]);
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}