import db from '../db.js';

export const accepteVacateur = async (idEnseignant) => {
      await db.query(`UPDATE enseignant SET etat = 1 WHERE users_id ='${idEnseignant}'`);
}

export const ShowVacateur = async () => {
    const [rows] = await db.query(`SELECT * FROM enseignant WHERE etat = 0`);
    return rows;
}

export const refuseVacateur = async (idEnseignant) => {
    await db.query(`DELETE FROM enseignant WHERE users_id ='${idEnseignant}'`);
}

export const showEnseignant = async () => {
    const [rows] = await db.query(`SELECT * FROM enseignant WHERE etat = 1`);
    return rows;
}