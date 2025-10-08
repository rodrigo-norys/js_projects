import Authenticator from '../models/AuthModel.js';

function loginIndex(req, res) {
    res.render('login');
}

async function login(req, res) {
    try {
        const authenticator = new Authenticator(req.body);
        await authenticator.login();

        if (authenticator.errors.length) {
            req.flash('errors', authenticator.errors);
            req.session.save(() => res.redirect('/login'));
            return;
        }
        req.flash('login', 'Você está logado');
        req.session.user = authenticator.user;
        req.session.save(() => res.redirect('/'));
        return;
    }
    catch (error) {
        console.log(error);
        return res.render('404');
    }
}

function registerIndex(req, res) {
    res.render('register');
}

async function register(req, res) {
    try {
        const authenticator = new Authenticator(req.body);
        await authenticator.register();

        if (authenticator.errors.length) {
            req.flash('errors', authenticator.errors);
            req.session.save(() => res.redirect('/register'));
            return;
        }
        req.flash('success', 'Account created successfully');
        req.session.save(() => res.redirect('/register'));
        return;
    }
    catch (error) {
        console.log(error);
        return res.render('404');
    }
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) return res.redirect('/');
        res.redirect('/login');
    });
}

export default { loginIndex, login, registerIndex, register, logout };