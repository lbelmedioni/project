import express from 'express';
import userLoginSignup from './routers/userLoginSignup.js';
import vacateurRouters from './routers/vacateurRouters.js';
import chefRouters from './routers/chefRouters.js';
import enseignantRouters from './routers/enseignantRouters.js';
import adminRouters from './routers/adminRouters.js';
import 'dotenv/config';

const server = express();
server.use(express.json());

// Déclaration des routes
server.use('/user', userLoginSignup);
server.use('/vacateur', vacateurRouters);
server.use('/chefDepartement', chefRouters);
server.use('/enseignant', enseignantRouters);
server.use('/Admin', adminRouters);

// Route par défaut pour éviter "Cannot GET /"
server.get('/test', (req, res) => {
    res.send('Bienvenue sur l\'API de suivi des heures de vacation !');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
