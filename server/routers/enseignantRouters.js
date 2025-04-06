import express from 'express';
import {modifierEnseignant , saisirHeure , afficheModule} from '../controllers/enseignantController.js';

const router = express.Router();

router.post('/modifier',modifierEnseignant);
router.post('/relever',saisirHeure);
router.post('/module',afficheModule);

export default router;