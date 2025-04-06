import db from '../db.js';

export const findEnsei = async(idEnseignant) => {
    const [row] = await db.query(`SELECT * FROM enseignant WHERE users_id = '${idEnseignant}'`);
    return row[0];
}

export const addInArchif = async(idChef , Email , Password) =>{
    await db.query(`INSERT INTO users (users_id , Email , Password) VALUES ('${idChef}' , '${Email}' , '${Password}')`);
}



export const addUnniversite = async(NomUnniv) => {
    await db.query(`INSERT INTO unniversité (NomUnniv) VALUES ('${NomUnniv}')`);
}

export const addFaculte = async(idUnniversite , NomFaculte) => {
    await db.query(`INSERT INTO faculté(idUnniversité , nomFaculté) VALUES ('${idUnniversite}' , '${NomFaculte}')`)
}

export const addDepartement = async(idUnniversite,idFaculte , NomDepartement) => {
    await db.query(`INSERT INTO departement(idUnniversité , idFaculté , NomDepartement) VALUES ('${idUnniversite}' , '${idFaculte}' , '${NomDepartement}')`)
}   

export const addfilière = async(idUnniversite,idFaculte,idDepartement , NomFilière) => {
    await db.query(`INSERT INTO filière(idUnniversité , idFaculté ,idDepartement , nomFilière) VALUES ('${idUnniversite}','${idFaculte}','${idDepartement}','${NomFilière}')`)
}

export const addNiveau = async(idUnniversite,idFaculte,idDepartement,idFilière , NomNiveau) => {
    await db.query(`INSERT INTO niveau(idUnniversité , idFaculté ,idDepartement , idFilière , nomNiveau) VALUES ('${idUnniversite}','${idFaculte}','${idDepartement}','${idFilière}','${NomNiveau}')`)
}
export const addSpecialite = async(idUnniversite,idFaculte,idDepartement,idFilière,idNiveau , NomSpecialite) => {
    await db.query(`INSERT INTO spécialité(idUnniversité , idFaculté ,idDepartement , idFilière , idNiveau , nomSpécialité) VALUES ('${idUnniversite}','${idFaculte}','${idDepartement}','${idFilière}','${idNiveau}','${NomSpecialite}')`)
}

export const addModule = async(idUnniversite,idFaculte,idDepartement,idFilière,idNiveau,idSpecialite , NomModule) => {
    await db.query(`INSERT INTO module(idUnniversité , idFaculté ,idDepartement , idFilière , idNiveau , idSpécialité , Nom_module) VALUES ('${idUnniversite}','${idFaculte}','${idDepartement}','${idFilière}','${idNiveau}','${idSpecialite}','${NomModule}')`)
}