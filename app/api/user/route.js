import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Exemple de données utilisateurs simulées
const users = [
  {
    id: 1,
    role: "enseignant",
    nom: "Ahmed",
    prenom: "Harbouche",
    email: "ahmed@univ.com",
    universite: "Université de Chlef",
    faculte: "Informatique",
    departement: "Département de Science Informatique",
  },
  {
    id: 2,
    role: "chef_departemant",
    nom: "Sara",
    prenom: "Boudiaf",
    email: "sara@univ.com",
    universite: "Université de Chlef",
    faculte: "Mathématiques",
    departement: "Département de Mathématiques",
  },
];

export async function GET(req) {
  try {
    // Obtenir l'ID utilisateur depuis les headers
    const userId = req.headers.get('authorization')

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé, session introuvable" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        nom: true,
        prenom: true,
        email: true,
        universite: true,
        faculte: true,
        departement: true,
        role: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
