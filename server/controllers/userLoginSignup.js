import {insertUser , findUser,findFaculte, findUnniversite} from '../models/userLoginSignup.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const userSignup = async (req, res) => {
    try {
        const { nomUnniversite, nomFaculte, emailUser, mdpUser, confirmePassword } = req.body;

        const userExist = await findUser(emailUser);
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (mdpUser !== confirmePassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const unniv = await findUnniversite(nomUnniversite);
        if (!unniv) {
            return res.status(404).json({ message: "Université not found" });
        }

        const fac = await findFaculte(nomFaculte);
        if (!fac) {
            return res.status(404).json({ message: "Faculté not found" });
        }

        const hashPassword = await bcrypt.hash(mdpUser, 10);
        const idUnniversite = unniv.idUnniversité;
        const idFaculte = fac.idFaculé;

        await insertUser(idUnniversite, idFaculte, emailUser, hashPassword);
        res.status(201).json({ message: "User added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userLogin = async (req,res) => {
    const{emailUser,mdpUser} = req.body;
    const user = await findUser(emailUser);
    if(!user){
        res.send('user not found');
    }
    const match = await bcrypt.compare(mdpUser,user.Password);
    if(!match){
        res.send('wrong password');
    }
    res.send('logged in');
}