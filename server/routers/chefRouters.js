import express from 'express';
import {accepterVacateur,refuserVacateur,listeVacateur} from '../controllers/chefController.js';
import { listeEnseignant } from '../controllers/chefController.js';

const router = express.Router();

router.post('/accepter',accepterVacateur);
router.post('/refuser',refuserVacateur);
router.post('/liste',listeVacateur,listeEnseignant);


export default router;