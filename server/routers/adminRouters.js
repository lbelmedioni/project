import express from 'express';
import {choisirChef,deleteChef,addUnniv,addFacul,addDep,addFil,addSpe,addNiv,addMod} from '../controllers/adminController.js';

const router = express.Router();


router.post('/choisir',choisirChef);
router.post('/delete',deleteChef);
router.post('/addunniversite',addUnniv);
router.post('/addFaculte',addFacul);
router.post('/addDepartement',addDep);
router.post('/addFiliere',addFil);
router.post('/addSpecialite',addSpe);
router.post('/addNiveau',addNiv);
router.post('/addModule',addMod);


export default router;