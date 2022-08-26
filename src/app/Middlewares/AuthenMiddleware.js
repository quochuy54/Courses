
// Check login chua
exports.redirectLogin = function(req, res, next){
    if(req.session.user){
        return next();
    }
    return res.redirect('/authen/login')
};


// Check neu login roi thi ko cho vao cac trang login nua
exports.redirectHome = function(req, res, next){
    if(req.session.user){
        return res.redirect('/home')
    }

    return next();
}

