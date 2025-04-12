// app/api/ListeEns/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const enseignants = [
    {
      id: 1,
      nom: "Leena",
      prenom: "Ziane",
      email: "leena@example.com",
      universite: "UHBC",
      faculte: "Informatique",
    },
    {
      id: 2,
      nom: "Nabil",
      prenom: "Hamidi",
      email: "nabil@example.com",
      universite: "UHBC",
      faculte: "Mathématiques",
    },
  ];
  return NextResponse.json(enseignants);
}
