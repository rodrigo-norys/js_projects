import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import Auth from './validators/Auth.js';
import Contact from './validators/Contact.js';

const login = new Auth('.form-login');
const register = new Auth('.form-register');

const addContact = new Contact('.form-addContact');
const editContact = new Contact('.form-editContact');

login.init();
register.init();

addContact.init();
editContact.init();