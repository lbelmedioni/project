import { accepteVacateur } from "../models/chefModel.js";
import { refuseVacateur } from "../models/chefModel.js";
import {ShowVacateur} from "../models/chefModel.js";
import {showEnseignant} from "../models/chefModel.js";

export const accepterVacateur = async (req, res) => {
    try {
        const { idEnseignant } = req.body;
        await accepteVacateur(idEnseignant);
        res.status(200).json({ message: "Vacateur accepted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const refuserVacateur = async (req, res) => {
    try{
        const { idEnseignant } = req.body;
        await refuseVacateur(idEnseignant);
        res.status(200).json({ message: "Vacateur refused" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};
export const listeVacateur = async (req, res) => {
    try {
        const enseignants = await ShowVacateur();
        res.status(200).json(enseignants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const listeEnseignant = async (req, res) => {
    try {
        const enseignants = await showEnseignant();
        res.status(200).json(enseignants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}