import db from '../db.js';

export const inscription = async ( idUser , idUnnniversite , idFaculte , idDepartement , idFiliere , idSpecialite , idNiveau , idModule , nomVac , prenomVac ,dateDeNecaence , email, rang , etat) =>{
    await db.query(`INSERT INTO enseignant (users_id , idUnniverite , idFaculté , idDepartement , idFilière , idSpécialité , idNiveau , idModule , nomEnseignant , PrenomEnseignant,	DateDeNaissance , Email , Rang,Etat)
         VALUES ('${idUser }' , '${idUnnniversite}' , '${idFaculte}' , '${idDepartement}' , '${idFiliere}' , '${idSpecialite}' , '${idNiveau}' , '${idModule}' , '${nomVac}' , '${prenomVac}' ,'${dateDeNecaence}','${email}','${rang}','${etat}' ) `)
}

export const FindModule = async (nomModule) =>{
    const [row] = await db.query(`SELECT *FROM module  WHERE Nom_module='${nomModule}'`);
    return row[0];
}

export const findNiveau = async (nomNiveau) =>{
    const [row] = await db.query(`SELECT *FROM niveau WHERE NomNiveau='${nomNiveau}'`);
    return row[0];
}
export const findSpecialite = async (nomSpecialite) =>{
    const [row] = await db.query(`SELECT *FROM spécialité WHERE NomSpécialité='${nomSpecialite}'`);
    return row[0];
}
export const findFiliere = async (nomFiliere) =>{
    const [row] = await db.query(`SELECT *FROM filière WHERE NomFilière='${nomFiliere}'`);
    return row[0];
}
export const findDepartement = async (nomDepartement) =>{
   const [row] = await db.query(`SELECT *FROM departement WHERE Nom_departement='${nomDepartement}'`);
   return row[0];
}
export const findFaculte = async (nomFaculte) =>{
    const [row] = await db.query(`SELECT *FROM faculté WHERE NomFaculté='${nomFaculte}'`);
    return row[0];
}
export const findUnniversite = async (nomUnniversite) =>{  
    const [row] = await db.query(`SELECT *FROM unniversite WHERE NomUnniversite='${nomUnniversite}'`);
    return row[0];
}
export const findVacateur = async(userId) => {
    const [row] = await db.query("SELECT * FROM decition WHERE users_id = ?", [userId]);
    return row[0];
}
export const findDecition = async (decitionId) =>{
    const [row] = await db.query(`SELECT *FROM decition WHERE idDecition='${decitionId}'`);
    return row[0];
}

export const supprimerVacateur = async (idUser) =>{
    await db.query(`DELETE FROM enseignant WHERE users_id='${idUser}'`);
}