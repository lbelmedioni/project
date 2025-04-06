import { modifierEns } from "../models/enseignantModel.js";
import { modifier } from "../models/enseignantModel.js";
import {saisir} from "../models/enseignantModel.js";
import { findEnseignantModule } from "../models/enseignantModel.js";
import { findEnseignant } from "../models/enseignantModel.js";
import bcrypt from "bcryptjs";

export const modifierEnseignant = async (req, res) => {
    try {
        const { idEnseignant, nom, prenom, email, DateDeNaissance,password , passwordConfirm} = req.body;
        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const mod = await modifierEns(idEnseignant, nom, prenom, email, DateDeNaissance);
        await modifier(idEnseignant, email,hashPassword);
        res.status(200).json({ message: "Enseignant updated" });
        
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const saisirHeure = async(req , res) =>{
    try{
        const{Email, date , Début , Fin , type , sujet } = req.body
        const user = await findEnseignant(Email)
        if(!user){
            res.send("enseignant not find");
        }


        const ens = user.users_id
        const niveau = user.idNiveau
        const specialite = user.idSpécialité
        const module = user.idModule

        const sai = await saisir(ens , date ,  Début , Fin , niveau , specialite , type , module , sujet,0 )
        if(!sai){
            res.send("heures not enregistrer");
        }
        res.send("enregistrement avec recu")
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const afficheModule = async(req , res) =>{
    try{
        const{idEnseignant} = req.body;
        const ens = await findEnseignantModule(idEnseignant);
        console.log(ens);
        res.send("module afficher");
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}