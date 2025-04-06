import {addUnniversite} from '../models/adminModel.js';
import {addFaculte} from '../models/adminModel.js';
import {addDepartement} from '../models/adminModel.js';
import {addfilière} from '../models/adminModel.js';
import {addNiveau} from '../models/adminModel.js';
import {addSpecialite} from '../models/adminModel.js';
import {addModule} from '../models/adminModel.js';
import { findUnniversite } from '../models/vacateurModel.js';
import { findFaculte } from '../models/vacateurModel.js';
import { findDepartement } from '../models/vacateurModel.js';
import { findFiliere } from '../models/vacateurModel.js';
import { findSpecialite } from '../models/vacateurModel.js';
import { findNiveau } from '../models/vacateurModel.js';
import { findEnseignant } from '../models/enseignantModel.js';

import bcrypt from 'bcrypt';

export const deleteChef = async (req,res) =>{

}
export const choisirChef = async (req, res) => {
    try {
        const { idChef, password } = req.body;

        // تحقق من وجود password
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const chef = await findChef(idChef);
        if (!chef) {
            return res.status(404).json({ message: "Chef not found" });
        }

        const isChef = chef.users_id;
        if (isChef) {
            await deleteColumn();
            await addColumn();
        }

        
        const hashPassword = await bcrypt.hash(password, 10);
        await addPassword(hashPassword);

        res.status(200).json({ message: "Chef added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addUnniv = async (req, res) => {
    try{
        const {nomUnniversite} = req.body
        const unniversite = await addUnniversite(nomUnniversite);
        if(!unniversite){
            res.send("unniversite not added")
        }
        res.send("unniversite added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addFacul = async (req,res) => {
   try{
    const {nomUnniversite, nomFaculte} = req.body
    const unniv = await findUnniversite(nomUnniversite);
    if(!unniv){
        res.send("unniversite not found");
    }
    const idUnniversite = unniv.idUnniversité;
    const faculte = await addFaculte(idUnniversite, nomFaculte);
    if(!faculte){
        res.send("faculte not added");
    }
    res.send("faculte added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const addDep = async (req,res) => {
    try{
        const{nomUnniversite , nomFaculte , nomDepartement} = req.body
        const unniv = await findUnniversite(nomUnniversite);
        if(!unniv){
            res.send("unniversite not found");
        }
        const fac = await findFaculte(nomFaculte);
        if(!fac){
            res.send("faculte not found");
        }
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;
        const dep = await addDepartement(idUnniversite, idFaculte, nomDepartement);
        if(!dep){
            res.send("departement not added");
        }
        res.send("departement added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addFil = async (req,res) => {
    try{
        const{nomUnniversite , nomFaculte , nomDepartement , nomFiliere} = req.body
        const unniv = await findUnniversite(nomUnniversite);
        if(!unniv){
            res.send("unniversite not found");
        }
        const fac = await findFaculte(nomFaculte);
        if(!fac){
            res.send("faculte not found");
        }
        const dep = await findDepartement(nomDepartement);
        if(!dep){
            res.send("departement not found");
        }
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;
        const idDepartement = dep.idDepartement;
        const fil = await addfilière(idUnniversite, idFaculte, idDepartement, nomFiliere);
        if(!fil){
            res.send("filiere not added");
        }
        res.send("filiere added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addSpe = async (req,res) => {
    try{
        const{nomUnniversite , nomFaculte , nomDepartement , nomFiliere , nomSpecialite} = req.body
        const unniv = await findUnniversite(nomUnniversite);
        if(!unniv){
            res.send("unniversite not found");
        }
        const fac = await findFaculte(nomFaculte);
        if(!fac){
            res.send("faculte not found");
        }
        const dep = await findDepartement(nomDepartement);
        if(!dep){
            res.send("departement not found");
        }
        const fil = await findFiliere(nomFiliere);
        if(!fil){
            res.send("filiere not found");
        }
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;
        const idDepartement = dep.idDepartement;
        const idFiliere = fil.idFilière;
        const spec = await addSpecialite(idUnniversite, idFaculte, idDepartement, idFiliere, nomSpecialite);
        if(!spec){
            res.send("specialite not added");
        }
        res.send("specialite added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addNiv = async(req,res) =>{
    try{
        const{nomUnniversite , nomFaculte , nomDepartement , nomFiliere , nomSpecialite , nomNiveau} = req.body
        const unniv = await findUnniversite(nomUnniversite);
        if(!unniv){
            res.send("unniversite not found");
        }
        const fac = await findFaculte(nomFaculte);
        if(!fac){
            res.send("faculte not found");
        }
        const dep = await findDepartement(nomDepartement);
        if(!dep){
            res.send("departement not found");
        }
        const fil = await findFiliere(nomFiliere);
        if(!fil){
            res.send("filiere not found");
        }
        const spe = await findSpecialite(nomSpecialite);
        if(!spe){
            res.send("specialite not found");
        }
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;
        const idDepartement = dep.idDepartement;
        const idFiliere = fil.idFilière;
        const idSpecialite = spe.idSpécialité;
        const niv = await addNiveau(idUnniversite, idFaculte, idDepartement, idFiliere, idSpecialite, nomNiveau);
        if(!niv){
            res.send("niveau not added");
        }
        res.send("niveau added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addMod = async(req,res) =>{
    try{
        const{nomUnniversite , nomFaculte , nomDepartement , nomFiliere , nomSpecialite , nomNiveau , nomModule} = req.body
        const unniv = await findUnniversite(nomUnniversite);
        if(!unniv){
            res.send("unniversite not found");
        }
        const fac = await findFaculte(nomFaculte);
        if(!fac){
            res.send("faculte not found");
        }
        const dep = await findDepartement(nomDepartement);
        if(!dep){
            res.send("departement not found");
        }
        const fil = await findFiliere(nomFiliere);
        if(!fil){
            res.send("filiere not found");
        }
        const spe = await findSpecialite(nomSpecialite);
        if(!spe){
            res.send("specialite not found");
        }
        const niv = await findNiveau(nomNiveau);
        if(!niv){
            res.send("niveau not found");
        }
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;
        const idDepartement = dep.idDepartement;
        const idFiliere = fil.idFilière;
        const idSpecialite = spe.idSpécialité;
        const idNiveau = niv.idNiveau;
        const mod = await addModule(idUnniversite, idFaculte, idDepartement, idFiliere, idSpecialite, idNiveau, nomModule);
        if(!mod){
            res.send("module not added");
        }
        res.send("module added");
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

