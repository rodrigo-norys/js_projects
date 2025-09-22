function middlewareGlobal(req, res, next) {
    next();
}

function outroMiddleware(req, res, next) {
    next();
}

function checkCsrfError(error, req, res, next) {
    if (error) {
        return res.render('404');
    }
    next();
}

function csrfMiddleware(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}
export default { middlewareGlobal, outroMiddleware, checkCsrfError, csrfMiddleware};