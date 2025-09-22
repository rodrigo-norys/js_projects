import express from 'express';
import homeController from './src/controllers/homeController.js';
import loginController from './src/controllers/loginController.js';

const route = express.Router();

// Rotas do Home.
route.get('/', homeController.index);

// Rotas de Login.
route.get('/login', loginController.index);

export default route;
