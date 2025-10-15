import express from 'express';
import middleware from './src/middlewares/middleware.js';
import homeController from './src/controllers/homeController.js';
import authController from './src/controllers/authController.js';
import contactController from './src/controllers/contactController.js';

const route = express.Router();

// Home routes.
route.get('/', homeController.index);

// Login routes.
route.get('/login', middleware.guestOnly, authController.loginIndex);
route.post('/login', authController.login);
route.get('/logout', authController.logout);

// Register routes.
route.get('/register', middleware.guestOnly, authController.registerIndex);
route.post('/register', authController.register);

// Contact routes.
route.get('/contact-add', middleware.userOnly, contactController.contactIndex);
route.get('/contact-list', middleware.userOnly, contactController.listContacts);
route.get('/contact/delete/:id', contactController.deleteContact);
route.get('/contact/:id', middleware.userOnly, contactController.toEditContact);
route.post('/contact/:id', contactController.editContact);
route.post('/contact', contactController.addContact);


export default route;
