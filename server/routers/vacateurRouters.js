import express from 'express';
import {vacateurInscrir,supprimerVacateur} from'../controllers/vacateurController.js';


const router = express.Router();


router.post('/inscrir',vacateurInscrir);
router.post('/supprimer',supprimerVacateur);

export default router;