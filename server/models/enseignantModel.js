import db from '../db.js';


export const modifierEns = async (idEnseignant, nom, prenom, email, DateDeNaissance) => {
    await db.query(`UPDATE enseignant SET nomEnseignant = '${nom}', PrenomEnseignant = '${prenom}', Email = '${email}', DateDeNaissance = '${DateDeNaissance}'  WHERE users_id = '${idEnseignant}'`);
}

export const modifier = async (idEnseignant, email,password) => {
    await db.query(`UPDATE users SET Email = '${email}',Password ='${password}' WHERE users_id = '${idEnseignant}'`);
}

export const saisir = async(date , Début , Fin , idNiveau , idSpecialite , type , idModule , sujet , etat) => {
    await db.query(`INSERT INTO relever (Date,Début,Fin,idNiveau,idSpécialité,Type,idModule,Sujet,Etat) VALUES ('${date}' , '${Début}' , '${Fin}' , '${idNiveau}', '${idSpecialite}', '${type}' , '${idModule}' , '${date}' , '${sujet}' , '${etat}')`)
}

export const findEnseignant = async(email) => {
    const [row] = await db.query(`SELECT * FROM enseignant WHERE Email = '${email}'`);
    return row[0];
}

export const findEnseignantModule = async(idEnseignant) => {
    const [row] = await db.query( `
        SELECT r.idRelever, r.users_id, r.Date, r.Début, r.Fin, 
               m.Nom_module, r.Sujet, r.Etat
        FROM relever r
        JOIN module m ON r.idModule = m.idModule
        JOIN enseignant e ON r.users_id = e.users_id
        WHERE r.users_id = '${idEnseignant}';
      `);
    return row[0];
}

export const FindEnseignantSpecialite = async(idEnseignant) => {
    await db.query(`SELECT e.idSpécialité from enseignant e
        JOIN spécialité s ON e.idSpécialité = s.idSpécialité
        WHERE e.users_id = '${idEnseignant}'`);
}
