const User = require('../Models/User');
const Course = require('../Models/Course')
const bcrypt = require('bcrypt');
const { MutiMongooseToOjbect } = require('../../util/mongoose')

class AuthenController{

     //[GET] /authen/login
    async loginForm(req, res, next){
        res.render('authen/login')
    }

     //[POST] /authen/login
    async login(req, res, next){
        let user = await User.findOne({email: req.body.email});
        if(!user){
            res.redirect('back');
            return;
        }
        const passwordValid = await bcrypt.compare(req.body.password, user.password);
        if(!passwordValid){
            res.redirect('back');
            return;
        }
        req.session.user = user;
        res.redirect('/home');
    }

    //[GET] /authen/register
    async registerForm(req, res, next) {
        res.render('authen/register');
    }

    //[POST] /authen/register
    async register(req, res, next) {
        let password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: password
        });
        user.save().then(()=> {
            res.redirect('/authen/login');
        })
        .catch((e) => {
            res.redirect('back');
        })
    }

    //[GET] /authen/logout
    logout(req, res, next){
        req.session.destroy();
        res.redirect('/home');
    }
};

module.exports = new AuthenController();
