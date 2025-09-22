function index(req, res) {
    res.render('login');
}

function register(req, res){
    res.send(req.body);
}

export default { index, register };