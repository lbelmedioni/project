// app/api/HeuresSaisies/route.js
export async function GET() {
    const fakeData = [
      { name: "Lundi", heures: 4 },
      { name: "Mardi", heures: 6 },
      { name: "Mercredi", heures: 5 },
      { name: "Jeudi", heures: 7 },
      { name: "Vendredi", heures: 3 },
    ];
  
    return Response.json(fakeData);
  }
  