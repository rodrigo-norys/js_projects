import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import helmet from 'helmet';
import csrf from 'csurf';

import session from 'express-session';
import MongoStoreImport from 'connect-mongo';
import flash from 'connect-flash';

import middlewares from './src/middlewares/middleware.js';
import routes from './routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('ready'); // "ready" event.
    })
    .catch(error => console.log(error));

// Session + MongoStore.
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStoreImport.create({
        mongoUrl: process.env.CONNECTIONSTRING,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}));

// EJS Configuration.
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Express Middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(helmet());
app.use(csrf());

app.use(flash());

app.use(middlewares.middlewareGlobal);
app.use(middlewares.csrfMiddleware)
app.use(middlewares.checkCsrfError);

app.use(routes);
app.on('ready', () => { // "ready" event verification.
    app.listen(3000, () => {
        console.log('http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});