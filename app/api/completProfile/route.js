import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, department, birthdate, gender, location } = body

    if (!userId || !department || !birthdate || !gender || !location) {
      return NextResponse.json({ message: 'Champs manquants.' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        department,
        birthdate: new Date(birthdate),
        gender,
        location,
      },
    })

    return NextResponse.json({ message: 'Profil mis à jour', user: updatedUser }, { status: 200 })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
