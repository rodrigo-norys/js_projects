function middlewareGlobal(req, res, next) {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

function checkCsrfError(err, req, res, next) {
    if (err && err.code === 'EBADCSRFTOKEN') return res.render('404');
    next();
}

function csrfMiddleware(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}

function guestOnly(req, res, next) {
    if (typeof req.session.user !== 'undefined') return res.render('404');
    next();
}

function userOnly(req, res, next) {
    if (typeof req.session.user === 'undefined') return res.render('404');
    next();
}

export default { middlewareGlobal, guestOnly, userOnly, checkCsrfError, csrfMiddleware };