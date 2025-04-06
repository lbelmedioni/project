import {inscription,findFiliere,findDepartement,FindModule,findNiveau,findSpecialite,findDecition} from '../models/vacateurModel.js';
import {findUser} from '../models/userLoginSignup.js';  


export const vacateurInscrir = async (req, res) => {
    try {
        const { emailUse, nomDepartement, nomfiliere, nomSpecialite, nomNiveau, nomModule, nom, prenom, dateDeNecaence, rang } = req.body;
        
        const users = await findUser(emailUse);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }

        const fil = await findFiliere(nomfiliere);
        if (!fil) {
            return res.status(404).json({ message: "Filiere not found" });
        }

        const dep = await findDepartement(nomDepartement);
        if (!dep) {
            return res.status(404).json({ message: "Departement not found" });
        }

        const mod = await FindModule(nomModule);
        if (!mod) {
            return res.status(404).json({ message: "Module not found" });
        }

        const niv = await findNiveau(nomNiveau);
        if (!niv) {
            return res.status(404).json({ message: "Niveau not found" });
        }

        const spe = await findSpecialite(nomSpecialite);
        if (!spe) {
            return res.status(404).json({ message: "Specialite not found" });
        }

        const user = users.users_id;
        const unniv = users.idUnniversité;
        const fac = users.idFaculté;
        const emailUser = users.Email;
        const depart = dep.idDepartement;
        const filiere = fil.idFilière;
        const specialite = spe.idSpécialité;
        const niveau = niv.idNiveau;
        const module = mod.idModule;

        await inscription(user, unniv, fac, depart, filiere, specialite, niveau, module, nom, prenom, dateDeNecaence, emailUser, rang,0);

        res.status(201).json({ message: "Inscription successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const supprimerVacateur = async (req, res) => {
    try {
        const { idUser } = req.body;

        const user = await findDecition(idUser);
        if (!dec) {
            return res.status(404).json({ message: "Decition not found" });
        }
        const isTher = user.users_id;

        await supprimerVacateur(isTher);

        res.status(200).json({ message: "Decition deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}