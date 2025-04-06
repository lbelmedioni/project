import { NextResponse } from 'next/server';
import { db } from '@/server/db';

// Récupérer tous les chefs
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id,
        u.nom as universite,
        f.nom as faculte,
        d.nom as departement,
        e.nom as enseignant
      FROM chef_departement c
      JOIN universite u ON c.universite_id = u.id
      JOIN faculte f ON c.faculte_id = f.id
      JOIN departement d ON c.departement_id = d.id
      JOIN enseignant e ON c.enseignant_id = e.id
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des chefs:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chefs' },
      { status: 500 }
    );
  }
}

// Ajouter un nouveau chef
export async function POST(request) {
  try {
    const { universite, faculte, departement, enseignant } = await request.json();
    
    await db.query(`
      INSERT INTO chef_departement (universite_id, faculte_id, departement_id, enseignant_id)
      VALUES (?, ?, ?, ?)
    `, [universite, faculte, departement, enseignant]);
    
    return NextResponse.json({ message: 'Chef ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du chef:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du chef' },
      { status: 500 }
    );
  }
}


// Supprimer un chef
export async function DELETE(request) {
  const { id } = request.params;
  
  try {
    await db.query('DELETE FROM chef_departement WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Chef supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du chef:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du chef' },
      { status: 500 }
    );
  }
}